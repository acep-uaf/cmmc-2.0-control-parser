// A JavaScript script that reads the content of a text file taken on the command line as the first argument.
// And parses each line of the text file which contains CMMC v2.0 Controls that have been copied from the published PDF (https://dodcio.defense.gov/Portals/0/Documents/CMMC/ModelOverviewv2.pdf) Page 6-17.
// Parses lines and extracts the CMMC Control Set into a JSON object and outputs to JSON and CSV file format.

const fs = require('fs');

const filePath = process.argv[2];
const fileContents = fs.readFileSync(filePath, 'utf-8');
const lines = fileContents.split('\n');

// Define Regular Expression Patterns
const patter_map = {
    "CMMC_DOMAIN":"^([A-Z\\s]+) \\(([A-Z]{2})\\)$",  // e.g. "ACCESS CONTROL (AC)"
    "CMMC_LEVEL":"^Level\ ([1-3])\ Description$",  // e.g. "Level 1 Description"
    "CMMC_CONTROL_ID":"^([A-Z]{2})\.L([1-3])\-([0-9a-z]\.[0-9]+\.[0-9a-z]+)$", // e.g. "DD.L#-REQ"
    "IGNORE_FOOTER":"^Cybersecurity Maturity Model Certification"
}

// Regular Expression to match:   Cybersecurity Maturity Model Certification (CMMC) Model Overview | Version 2.13 7

// CMMC_CONTROL_ID This subsection itemizes the security requirements for each domain and at each level. Each
// requirement has a requirement identification number in the format – DD.L#-REQ – where:
// • DD is the two-letter domain abbreviation;
// • L# is the level number; and
// • REQ is the FAR Clause 52.204-21 paragraph number, NIST SP 800-171 Rev 2, or NIST SP
// 800-172 security requirement number.

// console.log(JSON.stringify(patter_map, null, 2));


// Vars
let controls_arry       = [];
let controls_tree       = {};
let controls            = {};
let domains             = {};
let domain              = '';
let domain_abbr         = '';
let level               = '';
let ctl_idcontrol_id          = '';
let control_id_dom_abbr = '';
let control_id_level    = '';
let control_id_req      = '';
let control_name        = '';
let description         = '';

// Parser
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.match(patter_map["IGNORE_FOOTER"])) {
        // Ignore Page Footers
        // console.log("IGNORE_FOOTER: " + line);

    } else if (line.match(patter_map["CMMC_DOMAIN"])) {
        // Set Domain
        domain = line.match(patter_map["CMMC_DOMAIN"])[1];
        domain_abbr = line.match(patter_map["CMMC_DOMAIN"])[2];
        domains[domain_abbr] = domain;

        // if (control_id) {
        //     controls[control_id]['DESCRIPTION'] = "";
        // }

    } else if (line.match(patter_map["CMMC_LEVEL"])) {
        // Set Level
        level = line.match(patter_map["CMMC_LEVEL"])[1];

        // if (control_id) {
        //     controls[control_id]['DESCRIPTION'] = "";
        // }

    } else if (line.match(patter_map["CMMC_CONTROL_ID"])) {
        // Set Control ID        
        control_id_dom_abbr = line.match(patter_map["CMMC_CONTROL_ID"])[1];
        control_id_level = line.match(patter_map["CMMC_CONTROL_ID"])[2];
        control_id_req = line.match(patter_map["CMMC_CONTROL_ID"])[3];
        control_id = control_id_dom_abbr + ".L" + control_id_level + "-" + control_id_req;
        control_name = lines[++i];
        description = '';

        controls[control_id] = {};
        controls[control_id]['CONTROL_ID'] = control_id;
        controls[control_id]['CONTROL_NAME'] = control_name;
        controls[control_id]['DOMAIN'] = domains[control_id_dom_abbr];
        controls[control_id]['DOMAIN_ABBR'] = control_id_dom_abbr;
        controls[control_id]['LEVEL'] = control_id_level;
        controls[control_id]['CONTROL_REQUIREMENT'] = control_id_req;
        controls[control_id]['DESCRIPTION'] = "";


    } else if (controls[control_id]['DESCRIPTION'] != "") {
        // Append Description
        controls[control_id]['DESCRIPTION'] += " " + line;
        // console.log("CONTROL DESC APPD: " + control_id + " : " + controls[control_id]['DESCRIPTION']);

    } else if (controls[control_id]['DOMAIN'] && controls[control_id]['DOMAIN_ABBR'] && controls[control_id]['LEVEL'] && controls[control_id]['CONTROL_ID'] && controls[control_id]['CONTROL_NAME'] && controls[control_id]['CONTROL_REQUIREMENT']) {
        // Initialize Description
        controls[control_id]['DESCRIPTION'] = line;
        // console.log("CONTROL DESC INIT: " + control_id + " : " + controls[control_id]['DESCRIPTION']);

    } else {
        console.log("ERROR: UNMATCHED LINE: " + line);
    }
}
    

// console.log(JSON.stringify(controls, null, 2));

// JSON File: By Controls
console.log("JSON File: By Controls");
console.log ("   Writting: cmmc_2.13_controls_by_control.json");
fs.writeFileSync('cmmc_2.13_controls_by_control.json', JSON.stringify(controls, null, 2));

// CSV File: By Controls
let csv = '';
const col_order = ['DOMAIN_ABBR', 'DOMAIN', 'LEVEL', 'CONTROL_REQUIREMENT', 'CONTROL_ID', 'CONTROL_NAME', 'DESCRIPTION'];

for (let i = 0; i < col_order.length; i++) {
    if (i == col_order.length - 1) {
        csv += '"' + col_order[i] + '"' + '\n';
    } else {
        csv += '"' + col_order[i] + '"' + ','; 
    }
}

for (let i = 0; i < Object.keys(controls).length; i++) {
    let control = Object.keys(controls)[i];
    for (let j = 0; j < col_order.length; j++) {
        if (j == col_order.length - 1) {
            csv += '"' + controls[control][col_order[j]] + '"' + '\n';
        } else {
            csv += '"' + controls[control][col_order[j]] + '"' + ',';
        }
    }
}

console.log("CSV File: By Controls");
console.log ("   Writting: cmmc_2.13_controls_by_control.csv");
fs.writeFileSync('cmmc_2.13_controls_by_control.csv', csv);

// JSON File: By Domains
let controls_by_domain = {};
for (control_id in controls) {
    if (!controls_by_domain.hasOwnProperty(controls[control_id]['DOMAIN_ABBR'])) {
        controls_by_domain[controls[control_id]['DOMAIN_ABBR']] = {};
        controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['DOMAIN'] = controls[control_id]['DOMAIN'];
        controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'] = {}
        controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][1] = {};
        controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][2] = {};
        controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][3] = {};
    }

    controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id] = {};
    controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['CONTROL_ID'] = controls[control_id]['CONTROL_ID'];
    controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['CONTROL_NAME'] = controls[control_id]['CONTROL_NAME'];
    // controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['CONTROL_REQUIREMENT'] = controls[control_id]['CONTROL_REQUIREMENT'];
    controls_by_domain[controls[control_id]['DOMAIN_ABBR']]['LEVEL'][ controls[control_id]['LEVEL'] ][control_id]['DESCRIPTION'] = controls[control_id]['DESCRIPTION'];
}
 
console.log("JSON File: By Domains");
console.log ("   Writting: cmmc_2.13_controls_by_domain.json");
fs.writeFileSync('cmmc_2.13_controls_by_domain.json', JSON.stringify(controls_by_domain, null, 2));

// JSON File: By Levels
let controls_by_level = {};
controls_by_level['LEVEL'] = {};

for (control_id in controls) {
    let level       = controls[control_id]['LEVEL'];
    let domain_abbr = controls[control_id]['DOMAIN_ABBR'];

    // console.log("LEVEL: " + level + " : " + domain_abbr + " : " + control_id);

    if (!controls_by_level['LEVEL'].hasOwnProperty(level)) {
        controls_by_level['LEVEL'][ level ] = {};
        if (level == 2 && !controls_by_level['LEVEL'].hasOwnProperty('3')) { controls_by_level['LEVEL']['3'] = {}; }
    }

    if (!controls_by_level['LEVEL'][ level ].hasOwnProperty('CONTROL_COUNT')) {
        controls_by_level['LEVEL'][ level ]['CONTROL_COUNT'] = 0;
        if (level == 2 && !controls_by_level['LEVEL']['3'].hasOwnProperty('CONTROL_COUNT')) { controls_by_level['LEVEL']['3']['CONTROL_COUNT'] = 0; }
    }

    controls_by_level['LEVEL'][ level ]['CONTROL_COUNT']++;
    if (level == 2) { controls_by_level['LEVEL']['3']['CONTROL_COUNT']++; }

    if (!controls_by_level['LEVEL'][ level ].hasOwnProperty(domain_abbr)) {
        controls_by_level['LEVEL'][ level ][domain_abbr] = {};
        if (level == 2 && !controls_by_level['LEVEL']['3'].hasOwnProperty(domain_abbr)) { controls_by_level['LEVEL']['3'][domain_abbr] = {}; }
    }
    controls_by_level['LEVEL'][ level ][domain_abbr]['DOMAIN'] = controls[control_id]['DOMAIN'];
    if (level == 2) { controls_by_level['LEVEL']['3'][domain_abbr]['DOMAIN'] = controls[control_id]['DOMAIN']; }

    if (!controls_by_level['LEVEL'][ level ][ domain_abbr ].hasOwnProperty('CONTROL')) {
        controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'] = {};
        if (level == 2 && !controls_by_level['LEVEL']['3'][ domain_abbr ].hasOwnProperty('CONTROL')) { controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'] = {}; }
    }

    if (!controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'].hasOwnProperty(control_id)) {
        controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ] = {};
        if (level == 2 && !controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'].hasOwnProperty(control_id)) { controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ] = {}; }
    }

    controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_ID'] = control_id;
    controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_NAME'] = controls[control_id]['CONTROL_NAME'];
    controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN'] = controls[control_id]['DOMAIN'];
    controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN_ABBR'] = controls[control_id]['DOMAIN_ABBR'];
    controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_REQUIREMENT'] = controls[control_id]['CONTROL_REQUIREMENT'];
    controls_by_level['LEVEL'][ level ][ domain_abbr ]['CONTROL'][ control_id ]['DESCRIPTION'] = controls[control_id]['DESCRIPTION'];

    if (level == 2) {
        controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_ID'] = control_id;
        controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_NAME'] = controls[control_id]['CONTROL_NAME'];
        controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN'] = controls[control_id]['DOMAIN'];
        controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['DOMAIN_ABBR'] = controls[control_id]['DOMAIN_ABBR'];
        controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['CONTROL_REQUIREMENT'] = controls[control_id]['CONTROL_REQUIREMENT'];
        controls_by_level['LEVEL']['3'][ domain_abbr ]['CONTROL'][ control_id ]['DESCRIPTION'] = controls[control_id]['DESCRIPTION'];
    }
}
 
console.log("JSON File: By Levels");
console.log ("   Writting: cmmc_2.13_controls_by_level.json");
fs.writeFileSync('cmmc_2.13_controls_by_level.json', JSON.stringify(controls_by_level, null, 2));


 // Controls by Control Markdown
 // Header 1:  Domain
 // Header 2:  Level
 // Header 3:  Control ID

let cmmc_controls_markdown = "# CMMC 2.13 Controls\n\n";
cmmc_controls_markdown += "- Reference: https://dodcio.defense.gov/Portals/0/Documents/CMMC/ModelOverviewv2.pdf\n\n";

for (domain_abbr in domains) {
    let domain = domains[domain_abbr];
    cmmc_controls_markdown += "## " + domain + "(" + domain_abbr + ")" + "\n\n";

    for (level in controls_by_level['LEVEL']) {
        cmmc_controls_markdown += "### Level " + level + "\n\n";

        for (control_id in controls) {
            if (level == controls[control_id]['LEVEL'] && domain_abbr == controls[control_id]['DOMAIN_ABBR']) {
                cmmc_controls_markdown += "#### " + control_id + " - " + controls[control_id]['CONTROL_NAME'] + "\n\n";
                cmmc_controls_markdown += controls[control_id]['DESCRIPTION'] + "\n\n";    
            }
        }
    }
}

console.log("JSON File: By Controls");
console.log ("   Writting: cmmc_2.13_controls_by_control.md");
fs.writeFileSync('cmmc_2.13_controls_by_control.md', cmmc_controls_markdown);