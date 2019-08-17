# krtuna - the next gen car tuner

The app: [https://ggeorgovassilis.github.io/krtuna/](https://ggeorgovassilis.github.io/krtuna/)

The code: [https://github.com/ggeorgovassilis/krtuna](https://github.com/ggeorgovassilis/krtuna)

The issue tracker: [https://github.com/ggeorgovassilis/krtuna/issues](https://github.com/ggeorgovassilis/krtuna/issues)

# technical notes

## producing the offline manifest

Either you know it by analysing the code :-)

or (using linux)

1. Load the app in a browser, inspect the network console
2. Export all requests as a HAR into a file (e.g. har.txt)
3. Use jq (https://stedolan.github.io/jq/tutorial/) like this: `cat har.txt | jq '.log.entries[] | .request.url' | sort | uniq'`
4. replace the URLs variable in serviceworker.js with the new values

(editing for an experiment)
