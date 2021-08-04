import * as https from "https"
import * as cheerio from "cheerio"

export function getHtml(url: string) : Promise<string> {
    
    
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            let HTML = ""
            response.on("data", chunk => {
                HTML += chunk
            })
            response.on("end", () => {
                resolve(HTML)
            })
        })
        .on("error", error => {
            reject(error)
        })
    })

    
}

function crawlSite(HTML) : Array<string> {

    const links = []
    const loadedData = cheerio.load(HTML)
    loadedData("loc").each((iteration, element) => {

        links.push(loadedData(element).text())

    })

    return links
}

