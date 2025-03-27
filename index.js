// cmmc-2.0-control-parser

// This script will parse CMMC PDF documents and converts control set data to JSON, CSV and Markdown formats.

const fs = require('fs');
const path = require('path');
const os = require('os');
const fetch = require('node-fetch');
const pdfParse = require('pdf-parse');
const { Console } = require('console');

// Load config.json as config object
let config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

// Get mode from command line argument
config["MODE"] =  process.argv[2];

switch (config.MODE) {
    case "setup":
        cmmc_setup();
        break;
    case "parse":
        cmmc_parse();
        break;
    default:
        cmmc_useage();
        break;
}


// console.log("DEBUG: Config: " + JSON.stringify(config, null, 2));

// ====================== Functions ======================

// Print Usage
function cmmc_useage() {
    console.log()
    console.log("################################################################");
    console.log("Usage: node index.js <setup|parse>");
    console.log()
    console.log("# Setup:  Download PDF's and convert to text formats");
    console.log("- node index.js setup");
    console.log()
    console.log("# Parse:  Parse PDF's and convert to JSON, CSV and Markdown formats");
    console.log("- node index.js parse");
    console.log("################################################################");

}

// Initialize:  Download PDF's and convert to text formats
function cmmc_setup() {
    // Ensure Directories Exist
    for (let dir in config.DIRECTORIES) {
        if (!fs.existsSync(config.DIRECTORIES[dir])) {
            fs.mkdirSync(config.DIRECTORIES[dir]);
        }
    }

    // Setup Document Paths
    for (let ver in config.CMMC.VERSIONS) {
        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {
            let url_parts = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["URL"].split("/");
            let doc_filename = url_parts.pop();

            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES'] = {}
            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'] = path.join(__dirname, config.DIRECTORIES.INPUT_DIR, doc_filename);
            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['TXT'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, doc_filename.replace(RegExp(".pdf$"), ".txt"));
            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['JSON'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, doc_filename.replace(RegExp(".pdf$"), ".json"));
            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['CSV'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, doc_filename.replace(RegExp(".pdf$"), ".csv"));
            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['MD'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, doc_filename.replace(RegExp(".pdf$"), ".md"));
        }
    }

    // Download Document Sources from URLs
    console.log("INFO: ====== Fetching Source PDF's ======");

    for (let ver in config.CMMC.VERSIONS) {
        console.log("INFO: CMMC Version: " + ver);
        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {

            let url = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["URL"];
            let filename = url.split("/").pop(); // extract filename from URL
            let filepath = path.join(__dirname, config.DIRECTORIES.INPUT_DIR, filename);

            // Set Input File Path
            config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'] = filepath;

            // check if file already exists
            console.log("");
            console.log("INFO:   Document: " + doc);
            console.log("INFO:     URL: " + url);
            // console.log("DEBUG:     Filename: " + filename);
            // console.log("DEBUG:     Filepath: " + filepath);


            if (!fs.existsSync(filepath)) { // and download if not
                (async () => {
                    try {
                        const res = await fetch(url, {
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                                'Accept': 'application/pdf',
                                'Accept-Language': 'en-US,en;q=0.9'
                            }
                        });

                        if (!res.ok) throw new Error(`Failed to download: ${res.status} ${res.statusText}`);

                        const buffer = await res.buffer();
                        fs.writeFileSync(filepath, buffer);
                        console.log(`STATUS:   ✅ DOWNLOADED: ${filepath}`);
                    } catch (err) {
                        console.error(`STATUS:   ❌ ERROR: ${err.message}`);
                    }
                })();
            } else {
                console.log(`STATUS:   ✅ ALREADY EXISTS: ${filepath}`);
            }
        }
    }

    // console.log("DEBUG: Config: " + JSON.stringify(config, null, 2));

    // Parse PDF Documents
    console.log()
    console.log("INFO: ====== Parsing Source PDF's ======");
    for (let ver in config.CMMC.VERSIONS) {
    console.log("CMMC Version: " + ver);

        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {
            // Parse PDF
            // if (config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["PARSE"]) {
                console.log("");
                console.log("INFO:   Document: " + doc);
                let pdf_file = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'];
                let pdf_file_parts = pdf_file.split(path.sep);

                // Set Output File Paths
                let text_file = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR,pdf_file_parts[pdf_file_parts.length - 1].replace(".pdf", ".txt"));
                let json_file = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR,pdf_file_parts[pdf_file_parts.length - 1].replace(".pdf", ".json"));
                let csv_file = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR,pdf_file_parts[pdf_file_parts.length - 1].replace(".pdf", ".csv"));
                let md_file = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR,pdf_file_parts[pdf_file_parts.length - 1].replace(".pdf", ".md"));

                let controls = {}
                let json_obj = {};
                let csv_text = "";
                let md_text = "";

                // let regx = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["REGEX"];
                let regx = {}
                for (let reg in config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["REGEX"]) {
                    regx[reg] = RegExp(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["REGEX"][reg]);
                }

                console.log("READING:  " + pdf_file);
                // console.log(JSON.stringify(regx, null, 2));


                // console.log("REGEX PATTERNS:");
                // for (let key in regx) {
                //     console.log("\t" + `${key}: ${regx[key].toString()}`);
                // }
                // console.log()

                const dataBuffer = fs.readFileSync(pdf_file);
                pdfParse(dataBuffer).then(data => {
                    // console.log(data.text); // plain text content
                    try {
                        fs.writeFileSync(text_file, data.text); // write plain text to text_file
                        console.log(`✅ WROTE: ${text_file}`);
                    } catch (err) {
                        console.error(`❌ ERROR: ${err.message}`);
                    }
                });
            // } // Close Parse Clause
        }
    }      
}

                // let lines = data.text.split('\n');

                // // Vars
                // let domain_map          = {};
                // let domain              = '';
                // let domain_abbr         = '';
                // let level               = '';
                // let control_id          = '';
                // let control_id_dom_abbr = '';
                // let control_id_level    = '';
                // let control_id_req      = '';
                // let control_id_name     = '';
                // let control_id_desc     = '';
                // let line_text           = '';
                // let assmt_obj_flag      = false;
                // let ass_obj_index       = '';
                // let ass_obj_text        = '';


                // for (let i = 0; i < lines.length; i++) {
                //     let line_match = false
                //     let regx_match = "";
                //     let line = lines[i];
                //     console.log("-----------------------------------------")
                //     console.log("LINE "+ i + ": [" + line + "]");

                //     for (let reg in regx) {
                //         // console.log("LINE "+ i + ": [" + line + "]  <=>  " + regx[reg].toString());

                //         if (!line_match) {
                //             if (parts = line.match(regx[reg])) {
                //                 // console.log(JSON.stringify(parts, null, 2));
                //                 // console.log("REGEX MATCH: " + reg + " : " + line.match(regx[reg])[0]);

                //                 switch (reg) {
                //                     case "IGNORE_FOOTER":
                //                         console.log(reg);
                //                         line_match     = true
                //                         // console.log("DEBUG: IGNORE_FOOTER")
                //                         break;
                //                     case "IGNORE_PAGE_NUMBER":
                //                         console.log(reg);
                //                         line_match     = true
                //                         // console.log("DEBUG: IGNORE_PAGE_NUMBER")
                //                         break;
                //                     case "IGNORE_WHITESPACE":
                //                         console.log(reg);
                //                         line_match     = true
                //                         // console.log("DEBUG: IGNORE_WHITESPACE")
                //                         break;
                //                     case "CMMC_DOMAIN":
                //                         console.log("DEBUG: MATCH: " + reg);
                //                         console.log(JSON.stringify(parts, null, 2));
                //                         line_match  = true
                //                         domain      = parts[1];
                //                         domain_abbr = parts[2];
                //                         domain_map[domain_abbr] = domain;

                //                         control_id  = ""
                //                         line_text   = ""; 
                //                         break;
                //                     // case "CMMC_LEVEL":
                //                     //     line_match = true
                //                     //     level = parts[1];
                //                     //     break;
                //                     // case "CMMC_CONTROL_ID":
                //                     //     line_match = true
                //                     //     level = parts[1];
                //                     //     control_id = parts[2];
                //                     //     control_id_name = parts[3];
                //                     //     break;
                //                     case "L2_ASMTGD_CONTROL_ID":
                //                         if (domain != "" && control_id == "") {
                //                             console.log("DEBUG: MATCH: " + reg);
                //                             console.log(JSON.stringify(parts, null, 2));
                //                             line_match          = true

                //                             control_id_dom_abbr = parts[1];
                //                             control_id_level    = parts[2];
                //                             control_id_req      = parts[3];
                //                             control_id_name     = parts[4];
                //                             control_id          = control_id_dom_abbr + ".L" + control_id_level + "-" + control_id_req;
                                            
                //                             controls[control_id] = {}
                //                             controls[control_id]["CONTROL_NAME"] = control_id_name;
                //                             controls[control_id]["DESCRIPTION"] = "";
                //                             controls[control_id]["CMMC_DOMAIN"] = domain_map[control_id_dom_abbr];
                //                             controls[control_id]["CMMC_DOMAIN_ABBR"] = control_id_dom_abbr;
                //                             controls[control_id]["CMMC_LEVEL"] = control_id_level;
                //                             controls[control_id]["REQUIREMENT"] = control_id_req;
                //                             controls[control_id]["ASSESSMENT_OBJECTIVES"] = {};
                //                             // controls[control_id]["DESCRIPTION"] = line[++i];
                //                             console.log(control_id + ": " + JSON.stringify(controls[control_id], null, 2));
                //                         }
                //                         break;
                //                     case "L2_ASMTGD_ASSESSEMENT_OBJECTIVES_END":
                //                         console.log("DEBUG: MATCH: " + reg);
                //                         if (assmt_obj_flag) {
                //                             line_match     = true
                //                             assmt_obj_flag = false
                //                         } else {
                //                             console.log("ERROR: NO assmt_obj_flag")
                //                         }
                //                         break;
                //                     case "L2_ASMTGD_ASSESSEMENT_OBJECTIVES_BEGIN":
                //                         console.log("DEBUG: MATCH: " + reg);
                //                         if (control_id != "") {
                //                             line_match = true
                //                             assmt_obj_flag = true
                //                         }
                //                         break;
                //                     case "L2_ASMTGD_ASSESSEMENT_OBJECTIVE":
                //                         console.log("DEBUG: MATCH: " + reg);
                //                         console.log(JSON.stringify(parts, null, 2));
                //                         if (assmt_obj_flag) {
                //                             line_match    = true
                //                             ass_obj_index = parts[1];
                //                             ass_obj_text  = parts[2];

                //                             controls[control_id]["ASSESSMENT_OBJECTIVES"][ass_obj_index] = ass_obj_text
                //                         }
                //                         break;
                //                     case "PARAGRAPH_LINE":
                //                         if (assmt_obj_flag) {
                //                             // console.log("DEBUG: MATCH: " + reg + " ASSMT OBJ");
                //                             // line_match = true
                //                             // console.log("DEBUG: "+ reg + ": control_id: " + control_id);
                //                             // console.log("DEBUG: "+ reg + ": ass_obj_index: " + ass_obj_index);
                //                             // console.log(JSON.stringify(controls, null, 2));
                //                             // controls[control_id]["ASSESSMENT_OBJECTIVES"][ass_obj_index] += line
                //                         } else if (control_id != "" && !assmt_obj_flag) {
                //                             console.log("DEBUG: MATCH: " + reg + " CONTROL ID: " + control_id + " DESCRIPTION");
                //                             line_match = true
                //                             // console.log(JSON.stringify(parts, null, 2));
                //                             // controls[control_id]["DESCRIPTION"] += parts[1];
                //                             // console.log("CTL DESC: " + controls[control_id]["DESCRIPTION"])
                //                         }
                //                         break;
                //                     default:
                //                         // console.log("DEBUG: IGNORE LINE")
                //                         line_match     = true
                //                         break;
                //                 }
                                
                //             }
                //         }
                //     }

                //     if (line_match) {
                //         // console.log("DEBUG: MATCH")
                //         // console.log(doc + " : " + domain + " (" + domain_abbr + ") : " + control_id + " : L" + level);
                //         // console.log("MATCH REGEX : " + regx_match);
                    
                //         console.log("MATCH:        " + doc + " | " + domain + " (" + domain_abbr + ") : " + control_id + " : " + control_id_name + " : assmt_obj_flag: ", assmt_obj_flag );
                //         // console.log("assmt_obj_flag: ", assmt_obj_flag);
                //         // console.log("              LINE "+ i + ":  [" + line + "]");
                //         // console.log("              "+ i + ":  [" + line + "]");
                //         console.log()
                //     } else {
                //         // console.log("DEBUG: NO MATCH")
                //         console.log()
                //     }

                // }
                // console.log("CONTROLS: ");
                // console.log(JSON.stringify(controls, null, 2));
    








//####################################################################################


// // Vars
// let controls_arry       = [];
// let controls_tree       = {};
// let controls            = {};          
// let domains             = {};
// let domain              = '';
// let domain_abbr         = '';
// let level               = '';
// let ctl_idcontrol_id          = '';
// let control_id_dom_abbr = '';
// let control_id_level    = '';
// let control_id_req      = '';
// let control_name        = '';
// let description         = '';

// // Parser
// for (let i = 0; i < lines.length; i++) {
//     let line = lines[i];

//     if (line.match(patter_map["IGNORE_FOOTER"])) {
//         // Ignore Page Footers
//         // console.log("IGNORE_FOOTER: " + line);

//     } else if (line.match(patter_map["CMMC_DOMAIN"])) {
//         // Set Domain
//         domain = line.match(patter_map["CMMC_DOMAIN"])[1];
//         domain_abbr = line.match(patter_map["CMMC_DOMAIN"])[2];
//         domains[domain_abbr] = domain;

//         // if (control_id) {
//         //     controls[control_id]['DESCRIPTION'] = "";
//         // }

//     } else if (line.match(patter_map["CMMC_LEVEL"])) {
//         // Set Level
//         level = line.match(patter_map["CMMC_LEVEL"])[1];

//         // if (control_id) {
//         //     controls[control_id]['DESCRIPTION'] = "";
//         // }

//     } else if (line.match(patter_map["CMMC_CONTROL_ID"])) {
//         // Set Control ID        
//         control_id_dom_abbr = line.match(patter_map["CMMC_CONTROL_ID"])[1];
//         control_id_level = line.match(patter_map["CMMC_CONTROL_ID"])[2];
//         control_id_req = line.match(patter_map["CMMC_CONTROL_ID"])[3];
//         control_id = control_id_dom_abbr + ".L" + control_id_level + "-" + control_id_req;
//         control_name = lines[++i];
//         description = '';

//         controls[control_id] = {};
//         controls[control_id]['CONTROL_ID'] = control_id;
//         controls[control_id]['CONTROL_NAME'] = control_name;
//         controls[control_id]['DOMAIN'] = domains[control_id_dom_abbr];
//         controls[control_id]['DOMAIN_ABBR'] = control_id_dom_abbr;
//         controls[control_id]['LEVEL'] = control_id_level;
//         controls[control_id]['CONTROL_REQUIREMENT'] = control_id_req;
//         controls[control_id]['DESCRIPTION'] = "";


//     } else if (controls[control_id]['DESCRIPTION'] != "") {
//         // Append Description
//         controls[control_id]['DESCRIPTION'] += " " + line;
//         // console.log("CONTROL DESC APPD: " + control_id + " : " + controls[control_id]['DESCRIPTION']);

//     } else if (controls[control_id]['DOMAIN'] && controls[control_id]['DOMAIN_ABBR'] && controls[control_id]['LEVEL'] && controls[control_id]['CONTROL_ID'] && controls[control_id]['CONTROL_NAME'] && controls[control_id]['CONTROL_REQUIREMENT']) {
//         // Initialize Description
//         controls[control_id]['DESCRIPTION'] = line;
//         // console.log("CONTROL DESC INIT: " + control_id + " : " + controls[control_id]['DESCRIPTION']);

//     } else {
//         console.log("ERROR: UNMATCHED LINE: " + line);
//     }
// }
    

// // console.log(JSON.stringify(controls, null, 2));

// // JSON File: By Controls
// console.log("JSON File: By Controls");
// console.log ("   Writting: cmmc_2.13_controls_by_control.json");
// fs.writeFileSync('cmmc_2.13_controls_by_control.json', JSON.stringify(controls, null, 2));

// // CSV File: By Controls
// let csv = '';
// const col_order = ['DOMAIN_ABBR', 'DOMAIN', 'LEVEL', 'CONTROL_REQUIREMENT', 'CONTROL_ID', 'CONTROL_NAME', 'DESCRIPTION'];

// for (let i = 0; i < col_order.length; i++) {
//     if (i == col_order.length - 1) {
//         csv += '"' + col_order[i] + '"' + '\n';
//     } else {
//         csv += '"' + col_order[i] + '"' + ','; 
//     }
// }

// for (let i = 0; i < Object.keys(controls).length; i++) {
//     let control = Object.keys(controls)[i];
//     for (let j = 0; j < col_order.length; j++) {
//         if (j == col_order.length - 1) {
//             csv += '"' + controls[control][col_order[j]] + '"' + '\n';
//         } else {
//             csv += '"' + controls[control][col_order[j]] + '"' + ',';
//         }
//     }
// }

// console.log("CSV File: By Controls");
// console.log ("   Writting: cmmc_2.13_controls_by_control.csv");
// fs.writeFileSync('cmmc_2.13_controls_by_control.csv', csv);

// // JSON File: By Domains
// let controls_by_domain = {};
// for (control_id in controls) {
//     if (!controls_by_domain.hasOwnProperty(controls[control_id]['DOMAIN_ABBR'])) {
//         controls_by_domain[controls[control_id]['DOMAIN_ABBR']] = {};
//         controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['DOMAIN'] = controls[control_id]['DOMAIN'];
//         controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'] = {}
//         controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][1] = {};
//         controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][2] = {};
//         controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][3] = {};
//     }

//     controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id] = {};
//     controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['CONTROL_ID'] = controls[control_id]['CONTROL_ID'];
//     controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['CONTROL_NAME'] = controls[control_id]['CONTROL_NAME'];
//     // controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['CONTROL_REQUIREMENT'] = controls[control_id]['CONTROL_REQUIREMENT'];
//     controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['DESCRIPTION'] = controls[control_id]['DESCRIPTION'];
// }
 
// console.log("JSON File: By Domains");
// console.log ("   Writting: cmmc_2.13_controls_by_domain.json");
// fs.writeFileSync('cmmc_2.13_controls_by_domain.json', JSON.stringify(controls_by_domain, null, 2));

// // JSON File: By Levels
// let controls_by_level = {};
// controls_by_level['LEVEL'] = {};

// for (control_id in controls) {
//     let level       = controls[control_id]['LEVEL'];
//     let domain_abbr = controls[control_id]['DOMAIN_ABBR'];

//     // console.log("LEVEL: " + level + " : " + domain_abbr + " : " + control_id);

//     if (!controls_by_level['LEVEL'].hasOwnProperty(level)) {
//         controls_by_level['LEVEL'][ level ] = {};
//         if (level == 2 && !controls_by_level['LEVEL'].hasOwnProperty('3')) { controls_by_level['LEVEL']['3'] = {}; }
//     }

//     if (!controls_by_level['LEVEL'][ level ].hasOwnProperty('CONTROL_COUNT')) {
//         controls_by_level['LEVEL'][ level ]['CONTROL_COUNT'] = 0;
//         if (level == 2 && !controls_by_level['LEVEL']['3'].hasOwnProperty('CONTROL_COUNT')) { controls_by_level['LEVEL']['3']['CONTROL_COUNT'] = 0; }
//     }

//     controls_by_level['LEVEL'][ level ]['CONTROL_COUNT']++;
//     if (level == 2) { controls_by_level['LEVEL']['3']['CONTROL_COUNT']++; }

//     if (!controls_by_level['LEVEL'][ level ].hasOwnProperty(domain_abbr)) {
//         controls_by_level['LEVEL'][ level ][domain_abbr] = {};
//         if (level == 2 && !controls_by_level['LEVEL']['3'].hasOwnProperty(domain_abbr)) { controls_by_level['LEVEL']['3'][domain_abbr] = {}; }
//     }
//     controls_by_level['LEVEL'][ level ][domain_abbr]['DOMAIN'] = controls[control_id]['DOMAIN'];
//     if (level == 2) { controls_by_level['LEVEL']['3'][domain_abbr]['DOMAIN'] = controls[control_id]['DOMAIN']; }

//     if (!controls_by_level['LEVEL'][ level ][ domain_abbr ].hasOwnProperty('CONTROL')) {
//         controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'] = {};
//         if (level == 2 && !controls_by_level['LEVEL']['3'][ domain_abbr ].hasOwnProperty('CONTROL')) { controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'] = {}; }
//     }

//     if (!controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'].hasOwnProperty(control_id)) {
//         controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ] = {};
//         if (level == 2 && !controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'].hasOwnProperty(control_id)) { controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ] = {}; }
//     }

//     controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_ID'] = control_id;
//     controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_NAME'] = controls[control_id]['CONTROL_NAME'];
//     controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN'] = controls[control_id]['DOMAIN'];
//     controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN_ABBR'] = controls[control_id]['DOMAIN_ABBR'];
//     controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_REQUIREMENT'] = controls[control_id]['CONTROL_REQUIREMENT'];
//     controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['DESCRIPTION'] = controls[control_id]['DESCRIPTION'];

//     if (level == 2) {
//         controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_ID'] = control_id;
//         controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_NAME'] = controls[control_id]['CONTROL_NAME'];
//         controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN'] = controls[control_id]['DOMAIN'];
//         controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN_ABBR'] = controls[control_id]['DOMAIN_ABBR'];
//         controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_REQUIREMENT'] = controls[control_id]['CONTROL_REQUIREMENT'];
//         controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['DESCRIPTION'] = controls[control_id]['DESCRIPTION'];
//     }
// }
 
// console.log("JSON File: By Levels");
// console.log ("   Writting: cmmc_2.13_controls_by_level.json");
// fs.writeFileSync('cmmc_2.13_controls_by_level.json', JSON.stringify(controls_by_level, null, 2));


//  // Controls by Control Markdown
//  // Header 1:  Domain
//  // Header 2:  Level
//  // Header 3:  Control ID

// let cmmc_controls_markdown = "# CMMC 2.13 Controls\n\n";
// cmmc_controls_markdown += "- Reference: https://dodcio.defense.gov/Portals/0/Documents/CMMC/ModelOverviewv2.pdf\n\n";

// for (domain_abbr in domains) {
//     let domain = domains[domain_abbr];
//     cmmc_controls_markdown += "## " + domain + "(" + domain_abbr + ")" + "\n\n";

//     for (level in controls_by_level['LEVEL']) {
//         cmmc_controls_markdown += "### Level " + level + "\n\n";

//         for (control_id in controls) {
//             if (level == controls[control_id]['LEVEL'] && domain_abbr == controls[control_id]['DOMAIN_ABBR']) {
//                 cmmc_controls_markdown += "#### " + control_id + " - " + controls[control_id]['CONTROL_NAME'] + "\n\n";
//                 cmmc_controls_markdown += controls[control_id]['DESCRIPTION'] + "\n\n";    
//             }
//         }
//     }
// }

// console.log("JSON File: By Controls");
// console.log ("   Writting: cmmc_2.13_controls_by_control.md");
// fs.writeFileSync('cmmc_2.13_controls_by_control.md', cmmc_controls_markdown);