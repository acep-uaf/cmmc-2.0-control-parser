# CMMC_2.0 Control Parser

A JavaScript script that reads the content of a text file taken on the command line as the first argument.
And parses each line of the text file which contains CMMC v2.0 Controls that have been copied from the published PDF (https://dodcio.defense.gov/Portals/0/Documents/CMMC/ModelOverviewv2.pdf) Page 6-17.

Parses lines and extracts the CMMC Control Set into a JSON object and outputs to JSON and CSV file format.

# Usage

```
node index.js CMMC_2.0_L1-3_Controls.txt
```
