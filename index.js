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


// Setup Document Paths
for (let ver in config.CMMC.VERSIONS) {
    for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {
        let url_parts = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["URL"].split("/");
        let doc_filename = url_parts.pop();

        config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES'] = {}
        config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'] = path.join(__dirname, config.DIRECTORIES.INPUT_DIR, doc_filename);
        config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['TXT'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, "CMMC_V" + ver + "_" + doc_filename.replace(RegExp(".pdf$"), ".txt"));
        config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['JSON'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, "CMMC_V" + ver + "_" + doc_filename.replace(RegExp(".pdf$"), ".json"));
        config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['CSV'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, "CMMC_V" + ver + "_" + doc_filename.replace(RegExp(".pdf$"), ".csv"));
        config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['MD'] = path.join(__dirname, config.DIRECTORIES.OUTPUT_DIR, "CMMC_V" + ver + "_" + doc_filename.replace(RegExp(".pdf$"), ".md"));
    }
}


// Get mode from command line argument
config["MODE"] =  process.argv[2];

switch (config.MODE) {
    case "setup":
        cmmc_setup();
        break;
    case "parse":
        cmmc_parse();
        break;
    case "gendocs":
        cmmc_gendocs();
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


    // Download Document Sources from URLs
    console.log("INFO: ====== Fetching Source PDF's ======");

    for (let ver in config.CMMC.VERSIONS) {
        console.log("INFO: CMMC Version: " + ver);
        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {

            let url = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["URL"];

            // check if file already exists
            console.log("");
            console.log("INFO:   DOCUMENT: " + doc);
            console.log("INFO:     URL: " + url);
            console.log("INFO:     PDF: " + config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF']);


            if (!fs.existsSync(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'])) { // and download if not
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
                        fs.writeFileSync(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'], buffer);
                        console.log(`STATUS:   ✅ DOWNLOADED: ${config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF']}`);
                    } catch (err) {
                        console.error(`STATUS:   ❌ ERROR: ${err.message}`);
                    }
                })();
            } else {
                console.log(`STATUS:   ✅ ALREADY EXISTS: ${config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF']}`);
            }
        }
    }

    // Convert PDF Documents to Text
    console.log()
    console.log("INFO: ====== Parsing Source PDF's ======");
    for (let ver in config.CMMC.VERSIONS) {
    console.log("CMMC Version: " + ver);

        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {
            console.log("");
            console.log("INFO:   DOCUMENT: " + doc);
            let pdf_file  = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['PDF'];
            let text_file = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['TXT'];

            // Set Output File Paths
            console.log("READING:  " + pdf_file);

            const dataBuffer = fs.readFileSync(pdf_file);
            pdfParse(dataBuffer).then(data => {
                // console.log(data.text); // plain text content

                try {
                    fs.writeFileSync(text_file, data.text); // write plain text to text_file
                    console.log(`STATUS: ✅ WROTE: ${text_file}`);
                } catch (err) {
                    console.error(`STATUS: ❌ ERROR: ${err.message}`);
                }
            });
        }
    }      
}


function cmmc_parse() {

    // Vars
    let controls            = {};
    let domain_map          = {};
    let domain              = '';
    let domain_abbr         = '';
    let level               = '';
    let tlevel              = '';
    let control_id          = '';
    let control_id_dom_abbr = '';
    let control_id_level    = '';
    let control_id_req      = '';
    let control_id_name     = '';
    let control_id_desc     = '';
    let control_id_flag     = false;
    let control_name_flag   = false;
    let control_desc_flag   = false;
    let assmt_obj           = '';
    let assmt_obj_flag      = false;
    let ass_obj_index       = '';
    let ass_obj_text        = '';

    console.log()
    console.log("INFO: ====== Parsing Source PDF's ======");

    for (let ver in config.CMMC.VERSIONS) {
       console.log("CMMC Version: " + ver);

        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {
            if (config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["PARSE"]) {
                console.log("");
                console.log("INFO:   DOCUMENT: " + doc);
    
                controls = {}; // reset controls for each doc
                controls['DOCUMENT'] = {}
                controls['DOCUMENT']['CMMC'] = "Cybersecurity Maturity Model Certification"; 
                controls['DOCUMENT']["CMMC_VERSION"] = ver;
                controls['DOCUMENT']["TITLE"]        = doc;
                controls['DOCUMENT']["ABBR"]         = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["ABBR"];
                controls['DOCUMENT']["URL"]          = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["URL"]; 
                controls['DOCUMENT']["DATE"]         = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["DATE"];
                controls['DOCUMENT']["DoDID"]        = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["DoDID"];
                controls['DOCUMENT']["ZRIN"]         = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["ZRIN"];
                controls['DOCUMENT']["OTHER_ID"]     = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["OTHER_ID"];
                controls['DOCUMENT']["CONTROL_COUNT"] = 0 

                controls['CONTROLS'] = {}

                let regx = {};
                for (let rx in config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["REGEX"]) {
                    regx[rx] = RegExp(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["REGEX"][rx]);
                }            

                // DEBUG: Print Regex Patterns
                // console.log("INFO:   REGEX PATTERNS:");
                // for (let key in regx) {
                //     console.log("\t\t" + `${key}:    ${regx[key].toString()}`);
                // }
                // console.log()

                // Load Document Text File
                let doc_text = '';
                let lines = [];

                console.log("READING:  " + config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["FILES"]["TXT"]);
                try {
                    doc_text = fs.readFileSync(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["FILES"]["TXT"], 'utf-8');
                    lines = doc_text.split("\n");
                    console.log(`STATUS:   ✅ LOADED: ${path.join(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]["FILES"]["TXT"])}`);
                    console.log("INFO:     LINE COUNT: " + lines.length);
                } catch (err) {
                    console.error(`STATUS:   ❌ ERROR: ${err.message}`);
                }

                console.log();
                console.log("====================================================================")   

                // Parse Document Lines
                for (let i = 0; i < lines.length; i++) {
                    // Initialize New Line
                    let line_match = false
                    let line = lines[i];

                    // Sanitizing Text
                    // Remove trailing whitespace
                    line = line.replace(/\s+$/gm, '');

                    // Replace all EN DASH (U+2013) and EM DASH (U+2014) with -
                    line = line.replace(/[\u2013\u2014]/g, '-');

                    // console.log("DEBUG: LINE " + (i+1) + ": [" + line + "]");

                    // For each Regx
                    for (let rx in regx) {
                        if (!line_match) {
                            if (line.match(regx[rx])) {
                                let parts = line.match(regx[rx])

                                // DEBUG
                                // if (!rx.match("^IGNORE_") && domain != '') {
                                // if (line_match) {
                                //     console.log();
                                //     console.log("DEBUG: LINE " + i + ": [" + line + "]")
                                //     // console.log("DEBUG: LINE " + i + ": [" + line + "] <=> [" + lines[i] + "]");
                                //     console.log("DEBUG:   MATCHED REGEX: " + rx);

                                //     console.log("DEBUG:   LINE: " + i);
                                //     console.log("DEBUG:   DOMAIN:              " + domain);
                                //     console.log("DEBUG:   DOMAIN ABBR:         " + domain_abbr);
                                //     // console.log("DEBUG:   LEVEL:               " + level);
                                //     console.log("DEBUG:   CONTROL ID:          " + control_id);
                                //     console.log("DEBUG:   CONTROL ID DOM ABBR: " + control_id_dom_abbr);
                                //     console.log("DEBUG:   CONTROL ID LEVEL:    " + control_id_level);
                                //     console.log("DEBUG:   CONTROL ID REQ:      " + control_id_req);
                                // }

                                switch (config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['ABBR']) {
                                    case "PMO": // CMMC Program Model Overview
                                    switch (rx) {
                                        case "CMMC_DOMAIN":
                                            line_match = true;
                                            domain                  = parts[1];
                                            domain_abbr             = parts[2];
                                            domain_map[domain_abbr] = domain;
                                            break;

                                        case "CMMC_LEVEL":
                                            line_match = true;
                                            level = parts[1];
                                            tlevel = "L" + level;
                                            break;

                                        case "CMMC_CONTROL_ID":
                                            if (domain && level) {
                                                line_match = true;
                                                control_id_dom_abbr = parts[1];
                                                control_id_level    = parts[2];
                                                control_id_req      = parts[3];
                                                control_id          = control_id_dom_abbr + ".L" + control_id_level + "-" + control_id_req;

                                                control_name_flag   = true;
                                                control_desc_flag   = false;

                                                if (!controls["CONTROLS"].hasOwnProperty(tlevel)) {
                                                    controls["CONTROLS"][tlevel] = {}
                                                }

                                                if (!controls["CONTROLS"][tlevel].hasOwnProperty(control_id)) {
                                                    controls["CONTROLS"][tlevel][control_id] = {}
                                                    controls["CONTROLS"][tlevel][control_id]["CMMC_DOMAIN"]         = domain_map[control_id_dom_abbr];
                                                    controls["CONTROLS"][tlevel][control_id]["CMMC_DOMAIN_ABBR"]    = control_id_dom_abbr;
                                                    controls["CONTROLS"][tlevel][control_id]["CMMC_LEVEL"]          = control_id_level;
                                                    controls["CONTROLS"][tlevel][control_id]["CONTROL_ID"]          = control_id;
                                                    controls["CONTROLS"][tlevel][control_id]["CONTROL_NAME"]        = "";
                                                    controls["CONTROLS"][tlevel][control_id]["CONTROL_DESCRIPTION"] = "";

                                                    if (lines[i + 1].match(regx["CONTROL_NAME_W_BRACKETS"])) { 
                                                        controls["CONTROLS"][tlevel][control_id]["CONTROL_NAME"] = lines[++i];
                                                        control_name_flag = false;
                                                        control_desc_flag = true;
                                                    } else if (lines[i + 1].match(regx["CONTROL_NAME_BEGIN"]) && lines[i + 2].match(regx["CONTROL_NAME_END"])) {
                                                        controls["CONTROLS"][tlevel][control_id]["CONTROL_NAME"] = lines[++i] + " " + lines[++i];   
                                                        control_name_flag = false;
                                                        control_desc_flag = true;
                                                    } else {
                                                        controls["CONTROLS"][tlevel][control_id]["CONTROL_NAME"] = lines[++i];
                                                        control_name_flag = false;
                                                        control_desc_flag = true;
                                                    }

                                                    // Remove leading and trailing whitespace
                                                    controls["CONTROLS"][tlevel][control_id]["CONTROL_NAME"] = controls["CONTROLS"][tlevel][control_id]["CONTROL_NAME"].trim();

                                                }
                                            }
                                        break;

                                        // case "CONTROL_NAME_END":
                                        //     if (control_name_flag) {
                                        //         line_match = true;
                                        //         controls["CONTROLS"][control_id]["CONTROL_NAME"] += " " + line;
                                        //         control_name_flag = false;
                                        //         control_desc_flag = true;
                                        //     }
                                        //     break;

                                        case "PARAGRAPH_LINE":
                                            // if (control_name_flag) { // Control Name
                                            //     line_match = true;
                                            //     controls["CONTROLS"][control_id]["CONTROL_NAME"] += " " + line;
                                            // } else 
                                            if (control_desc_flag) { // Control Description
                                                line_match = true;
                                                controls["CONTROLS"][tlevel][control_id]["CONTROL_DESCRIPTION"] += " " + line;
                                                controls["CONTROLS"][tlevel][control_id]["CONTROL_DESCRIPTION"] =  controls["CONTROLS"][tlevel][control_id]["CONTROL_DESCRIPTION"].trim(); // Remove leading and trailing spaces
                                            } else {
                                                // Ignore Line
                                            }

                                        case "IGNORE_PAGE_NUMBER":
                                            // console.log("DEBUG:   Skipping Page Nubmer Line");
                                            break;

                                        case "IGNORE_FOOTER":
                                            // console.log("DEBUG:   Skipping Footer Line");
                                            break;

                                        case "IGNORE_WHITESPACE":
                                                // console.log("DEBUG:   Skipping Whitespace Line");
                                            break;
                                                
                                        default:
                                            // console.log("DEBUG:   Default Skipping Line");
                                            break;

                                    } // Close switch
                                    break;

                                    case "L1SG": // CMMC Scoping Guide - Level 1
                                    
                                        break;

                                    case "L1AG": // CMMC Assessment Guide - Level 1
                                        switch (rx) {
                                            case "CMMC_DOMAIN":
                                                line_match = true;
                                                domain                  = parts[1];
                                                domain_abbr             = parts[2];
                                                domain_map[domain_abbr] = domain;
                                                break;


                                            case "CMMC_CONTROL_ID":
                                                if (domain) {
                                                    line_match = true;
                                                    control_id_dom_abbr = parts[1];
                                                    control_id_level    = parts[2];
                                                    control_id_req      = parts[3];
                                                    control_id_name     = parts[4];
                                                    control_id          = control_id_dom_abbr + ".L" + control_id_level + "-" + control_id_req;
                                                    control_id_desc     = "";
                                                    control_id_flag     = true;  

                                                    controls["CONTROLS"][control_id] = {}
                                                    controls["CONTROLS"][control_id]["CMMC_DOMAIN"]             = domain_map[control_id_dom_abbr];
                                                    controls["CONTROLS"][control_id]["CMMC_DOMAIN_ABBR"]        = control_id_dom_abbr;
                                                    controls["CONTROLS"][control_id]["CMMC_LEVEL"]              = control_id_level;
                                                    controls["CONTROLS"][control_id]["CONTROL_ID"]              = control_id;
                                                    controls["CONTROLS"][control_id]["CONTROL_NAME"]         = control_id_name;
                                                    controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"]  = control_id_desc;
                                                    controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"]   = {};
                                                }
                                                break;

                                            case "ASSESSEMENT_OBJECTIVES_BEGIN":
                                                if (control_id) {
                                                    line_match = true;
                                                    assmt_obj_flag = true;
                                                    control_id_flag = false;
                                                    controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"] = String(controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"]).replace(/^\s+|\s+$/g, '') // Remove Leading and Trailing Whitespace
                                                }
                                                break;
                                                
                                            case "ASSESSEMENT_OBJECTIVE":
                                                if (assmt_obj_flag) {
                                                    line_match = true;
                                                    assmt_obj = parts[1];
                                                    controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"][assmt_obj] = parts[2];
                                                }
                                                break;

                                            case "ASSESSEMENT_OBJECTIVES_END":
                                                if (control_id && assmt_obj_flag) {
                                                    line_match = true;
                                                    assmt_obj_flag = false;
                                                }
                                                break;

                                            case "PARAGRAPH_LINE":
                                                if (control_id && control_id_flag && !assmt_obj_flag) { // Control ID Description
                                                    line_match = true;
                                                    controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"] += " " + line;        
                                                } else if (assmt_obj_flag && controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"][assmt_obj]) { // Assessment Objective
                                                    line_match = true;
                                                    controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"][assmt_obj] += " " + line;
                                                    // FIXME: Text added to last ASSESSMENT_OBJECTIVE:  13 Determine if:


                                                } else {
                                                    // Ignore Line
                                                }

                                                break;
                                            case "IGNORE_PAGE_NUMBER":
                                                // console.log("DEBUG:   Skipping Page Nubmer Line");
                                                break;

                                            case "IGNORE_FOOTER":
                                                // console.log("DEBUG:   Skipping Footer Line");
                                                break;

                                            case "IGNORE_WHITESPACE":
                                                    // console.log("DEBUG:   Skipping Whitespace Line");
                                                break;
                                            case "IGNORE_WHITESPACE":
                                                    // console.log("DEBUG:   Skipping Whitespace Line");
                                                break;
                                                
                                            default:
                                                // console.log("DEBUG:   Default Skipping Line");
                                                break;

                                        } // Close switch
                                        break;

                                    case "L2SG": // CMMC Scoping Guide - Level 2

                                        break;

                                    case "L2AG":  // CMMC Assessment Guide - Level 2
                                        switch (rx) {
                                            case "CMMC_DOMAIN":
                                                line_match = true;
                                                domain                  = parts[1];
                                                domain_abbr             = parts[2];
                                                domain_map[domain_abbr] = domain;
                                                break;


                                            case "CMMC_CONTROL_ID":
                                                let tmp_ctl_id = parts[1] + ".L" + parts[2] + "-" + parts[3];
                                                if (domain && !controls['CONTROLS'].hasOwnProperty(tmp_ctl_id)) {
                                                    line_match = true;
                                                    control_id_dom_abbr = parts[1];
                                                    control_id_level    = parts[2];
                                                    control_id_req      = parts[3];
                                                    control_id_name     = parts[4];
                                                    control_id          = control_id_dom_abbr + ".L" + control_id_level + "-" + control_id_req;
                                                    control_id_desc     = "";
                                                    control_id_flag     = true;  

                                                    controls["CONTROLS"][control_id] = {}
                                                    controls["CONTROLS"][control_id]["CMMC_DOMAIN"]      = domain_map[control_id_dom_abbr];
                                                    controls["CONTROLS"][control_id]["CMMC_DOMAIN_ABBR"] = control_id_dom_abbr;
                                                    controls["CONTROLS"][control_id]["CMMC_LEVEL"]       = control_id_level;
                                                    controls["CONTROLS"][control_id]["CONTROL_ID"]       = control_id;
                                                    controls["CONTROLS"][control_id]["CONTROL_NAME"]  = control_id_name;
                                                    controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"]  = control_id_desc;
                                                    controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"] = {};
                                                }
                                                break;

                                            case "ASSESSEMENT_OBJECTIVES_BEGIN":
                                                if (control_id) {
                                                    line_match = true;
                                                    assmt_obj_flag = true;
                                                    control_id_flag = false;
                                                    controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"] = String(controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"]).replace(/^\s+|\s+$/g, '') // Remove Leading and Trailing Whitespace
                                                }
                                                break;
                                                
                                            case "ASSESSEMENT_OBJECTIVE":
                                                if (assmt_obj_flag) {
                                                    line_match = true;
                                                    assmt_obj = parts[1];
                                                    controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"][assmt_obj] = parts[2];
                                                }
                                                break;

                                            case "ASSESSEMENT_OBJECTIVES_END":
                                                if (control_id && assmt_obj_flag) {
                                                    line_match = true;
                                                    assmt_obj_flag = false;
                                                }
                                                break;

                                            case "PARAGRAPH_LINE":
                                                if (control_id && control_id_flag && !assmt_obj_flag) { // Control ID Description
                                                    line_match = true;
                                                    controls["CONTROLS"][control_id]["CONTROL_DESCRIPTION"] += " " + line;        
                                                } else if (assmt_obj_flag && controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"][assmt_obj]) { // Assessment Objective
                                                    line_match = true;
                                                    controls["CONTROLS"][control_id]["ASSESSMENT_OBJECTIVES"][assmt_obj] += " " + line;
                                                    
                                                } else {
                                                    // Ignore Line
                                                }

                                                break;
                                            case "IGNORE_PAGE_NUMBER":
                                                // console.log("DEBUG:   Skipping Page Nubmer Line");
                                                break;
    
                                            case "IGNORE_FOOTER":
                                                // console.log("DEBUG:   Skipping Footer Line");
                                                break;

                                            case "IGNORE_WHITESPACE":
                                                    // console.log("DEBUG:   Skipping Whitespace Line");
                                                break;
                                                
                                            default:
                                                // console.log("DEBUG:   Default Skipping Line");
                                                break;

                                        } // Close switch
                                        break;

                                    case "L3SG": // CMMC Scoping Guide - Level 3
                                        break;

                                    case "L3AG": // CMMC Assessment Guide - Level 3
                                        break;

                                    default:
                                        console.log("DEBUG:   UNKNOWN DOCUMENT: " + config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['ABBR']);
                                        break;
                                } // Close switch


                                // DEBUG
                                
                                if (line_match) {
                                    // console.log();
                                    // console.log("DEBUG: LINE " + (i+1) + ": [" + line + "]")

                                    // console.log("DEBUG:   MATCHED REGEX:     " + rx + ":       " + `${regx[rx].toString()}`);

                                    // console.log("DEBUG:   DOMAIN:              " + domain);
                                    // console.log("DEBUG:   DOMAIN ABBR:         " + domain_abbr);

                                    // console.log("DEBUG:   LEVEL:               " + level);

                                    // console.log("DEBUG:   CONTROL ID:          " + control_id);
                                    // console.log("DEBUG:   CONTROL ID DOM ABBR: " + control_id_dom_abbr);
                                    // console.log("DEBUG:   CONTROL ID LEVEL:    " + control_id_level);
                                    // console.log("DEBUG:   CONTROL ID REQ:      " + control_id_req);

                                    // if (control_id) {
                                    //     console.log(JSON.stringify(controls["CONTROLS"][control_id], null, 2));
                                    // }

                                    // console.log("DEBUG:   ASSMT OBJ FLAG: " + assmt_obj_flag);
                                    // console.log("DEBUG:   control_name_flag: " + control_id_flag);
                                    // console.log("DEBUG:   control_desc_flag: " + control_desc_flag);

                                }

                            } // Close REGX MATCH

                        } // Close LINE MATCH

                    } // Close REGX

                } // Close LINE 

                if (controls['DOCUMENT']['ABBR'].match(/^L[1-3]AG$/)) {
                    controls['DOCUMENT']["CONTROL_COUNT"] = Object.keys(controls["CONTROLS"]).length;                    
                } else if (controls['DOCUMENT']['ABBR'] == "PMO") {
                    controls['DOCUMENT']["CONTROL_COUNT"] = {}
                    controls['DOCUMENT']["CONTROL_COUNT"]["L1"] = Object.keys(controls["CONTROLS"]["L1"]).length;
                    controls['DOCUMENT']["CONTROL_COUNT"]["L2"] = Object.keys(controls["CONTROLS"]["L2"]).length;
                    controls['DOCUMENT']["CONTROL_COUNT"]["L3"] = Object.keys(controls["CONTROLS"]["L3"]).length;   
                }
                    

                // DEBUG
                // console.log();
                // console.log(JSON.stringify(controls, null, 2));

                // Write JSON File for Document
                try {
                    fs.writeFileSync(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['JSON'], JSON.stringify(controls, null, 2));
                    console.log(`STATUS: ✅ WROTE: ` + config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['JSON']);
                } catch (err) {
                    console.error(`STATUS: ❌ ERROR: ${err.message}`);      
                }

            } // Close PARSE

        } // Close Document

    }  // Close CMMC Version

} // Close Parse Function



function cmmc_gendocs() {
    // Read JSON Files for PARSE = true documents and generate CSV and Markdown files
    console.log("INFO: ====== Generating Documents ======");

    // Vars

    let controls = {};

    for (let ver in config.CMMC.VERSIONS) {
        controls[ver] = {};
        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {            
            if (config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['PARSE'] == true) {
                // Read JSON File to controls object
                try {
                    let json = JSON.parse(fs.readFileSync(config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['JSON'], 'utf-8'));
                    console.log(`STATUS: ✅ READ: ` + config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']['JSON']);

                    controls[ver][ json['DOCUMENT']['ABBR'] ] = {};
                    controls[ver][ json['DOCUMENT']['ABBR'] ]['DOCUMENT'] = json['DOCUMENT'];
                    controls[ver][ json['DOCUMENT']['ABBR'] ]['DOCUMENT']['FILE'] = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['FILES']
                    controls[ver][ json['DOCUMENT']['ABBR'] ]['CONTROLS'] = json['CONTROLS'];


                } catch (err) {
                    console.error(`STATUS: ❌ ERROR: ${err.message}`);
                }
            }
        }
    }

    // console.log(JSON.stringify(controls, null, 2));


    // Generate CSV File for Documents

    // Generate Markdown File for Documents

    for (let ver in config.CMMC.VERSIONS) {
        for (let doc in config.CMMC.VERSIONS[ver].DOCUMENTS) {
            let abbr = config.CMMC.VERSIONS[ver].DOCUMENTS[doc]['ABBR'];
            switch (abbr) {
                case "PMO":
                    cmmc_gen_pmo_md(controls[ver][abbr]);
                    break;
                case "L1AG":
                    // cmmc_gendocs_l1ag(controls[ver][doc]);
                    break;
                case "L2AG":
                    // cmmc_gendocs_l2ag(controls[ver][doc]);
                    break;
                case "L3AG":
                    // cmmc_gendocs_l3ag(controls[ver][doc]);
                    break;
            }
        }
    }

}

function cmmc_gen_pmo_md(controls) {
    console.log("INFO: Generating " + controls['DOCUMENT']['TITLE'] + " Markdown");
    console.log("INFO: to: " + controls['DOCUMENT']['FILE']['MD']);
    console.log(JSON.stringify(controls, null, 2));

    let md = "";

    md += "# " + controls['DOCUMENT']['TITLE'] + "\n";
    md += "\n";
    md += "- **TITLE:**     " + controls['DOCUMENT']['TITLE'] + "\n";
    md += "- **FRAMEWORK:** " + controls['DOCUMENT']['CMMC'] + "\n";
    md += "- **VERSION:**   " + controls['DOCUMENT']['CMMC_VERSION'] + "\n";
    md += "- **DATE:**      " + controls['DOCUMENT']['DATE'] + "\n";
    md += "- **ZRIN:**      " + controls['DOCUMENT']['ZRIN'] + "\n";
    md += "- **OTHER_ID:**  " + controls['DOCUMENT']['OTHER_ID'] + "\n";
    md += "- **URL:**       " + controls['DOCUMENT']['URL'] + "\n";
    md += "\n";

    md += "## Control Counts\n";
    md += "- **Level 1:** " + controls['DOCUMENT']['CONTROL_COUNT']["L1"] + " Controls\n";
    md += "- **Level 2:** " + controls['DOCUMENT']['CONTROL_COUNT']["L2"] + " Controls\n";
    md += "- **Level 3:** " + controls['DOCUMENT']['CONTROL_COUNT']["L3"] + " Controls\n";
    md += "\n";

    md += "## Controls\n";
    md += "\n";


    let levels = ["L1", "L2", "L3"];
    for (let l in levels) {
        if (l > 0) {
            md += "---\n";
        }
        md += "### Level " + levels[l] + "\n";
        md += "\n";

        // md += "#### " + controls['CONTROLS'][ levels[l] ][ Object.keys(controls['CONTROLS'][ levels[l] ])[0] ]['CMMC_DOMAIN'] + " (" + controls['CONTROLS'][levels[l]][ Object.keys(controls['CONTROLS'][ levels[l] ])[0] ]['CMMC_DOMAIN_ABBR'] + ")" + "\n";
    
        for (let cid in controls['CONTROLS'][levels[l]]) {
            // If first control then add domain header
            if (cid == Object.keys(controls['CONTROLS'][ levels[l] ])[0]) {
                md += "#### " + controls['CONTROLS'][ levels[l] ][cid]['CMMC_DOMAIN'] + " (" + controls['CONTROLS'][levels[l]][cid]['CMMC_DOMAIN_ABBR'] + ")" + "\n";
                md += "\n";

            }

            md += "##### " + cid + " - " + controls['CONTROLS'][ levels[l] ][cid]['CONTROL_NAME'] + "\n";
            // md += "- **Name:** " + controls['CONTROLS'][ levels[l] ][cid]['CONTROL_NAME'] + "\n";
            // md += "- **Domain:** " + controls['CONTROLS'][ levels[l] ][cid]['CMMC_DOMAIN'] + " (" + controls['CONTROLS'][levels[l]][cid]['CMMC_DOMAIN_ABBR'] + ")" + "\n";

            md += "\n";
            // md += "**Description**" + "\n";
            md += "###### Description" + "\n";

            md += "\n";
            md += controls['CONTROLS'][ levels[l] ][cid]['CONTROL_DESCRIPTION']

            md += "\n";
            md += "\n";
        }
    }


    try {
        fs.writeFileSync(controls['DOCUMENT']['FILE']['MD'], md);
        console.log(`STATUS: ✅ WROTE: ` + controls['DOCUMENT']['FILE']['MD']);
    } catch (err) {
        console.error(`STATUS: ❌ ERROR: ${err.message}`);      
    }
}