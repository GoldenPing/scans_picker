import puppeteer from 'puppeteer'   
import e from 'express'

//Création du server express
const app = e() 
const port = 3000
const url = "http://fanfox.net/"

//Route get title of first scan 
app.get('/first-scan', async(req, res)=>{
    //lancement du navigateur virtuel
    const browser = await puppeteer.launch();
    // littéralement on est sur la page d'accueil de chrome
    const page = await browser.newPage() 

    await page.goto(url)

    console.log(page.url);
   let border = await getContent('.edShow',page)
   console.log(border);
    res.send('Premier scan trouver !');
})

// dire au server express d'écouter sur le port mis en constante
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//Fonction permettant de retourner l'élément dom avec en paramètre un selector html et la page puppeter
async function  getContent(selector,page){
    const pageRes = await page.$$(selector);
    return await Promise.all(
        pageRes.map(async (element) => {
            return await page.evaluate(
                (el) => el.textContent,
                element
            );
        })
    );
}