let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
let mysql = require = require('mysql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/getwebdata', async(req, res) =>{
    try{
        let data = await axios.get('https://www.ruay.at/%e0%b8%95%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b8%ab%e0%b8%a7%e0%b8%a2%e0%b8%ae%e0%b8%b2%e0%b8%99%e0%b8%ad%e0%b8%a2/',{ headers: { "Accept-Encoding": "gzip,deflate,compress" }})
        if(data.status !== 200)
        {
            return res.status(200).send({
                message: "URL is incorrect"
            })
        }

        let html = await data.data
        let $ = cheerio.load(html)
        let result = Array.from($('div[class="elementor-element elementor-element-0f3684d elementor-widget elementor-widget-text-editor"] > div[class="elementor-widget-container"] > table > tbody > tr')).map((element) => ({
            fourdigit: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 29.4786%;"] > span[style="font-size: 18.6667px;"]').text(),
            threedigit: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 22.8232%;"] > span[style="font-size: 18.6667px;"]').text(),
            twodigit: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 21.9882%;"] > span[style="font-size: 18.6667px;"]').text(),
            fourdigit_1: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 29.4786%;"] > span[style="font-size: 18.6667px;"]').text().substring(0,1),
            fourdigit_2: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 29.4786%;"] > span[style="font-size: 18.6667px;"]').text().substring(1,2),
            fourdigit_3: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 29.4786%;"] > span[style="font-size: 18.6667px;"]').text().substring(2,3),
            fourdigit_4: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 29.4786%;"] > span[style="font-size: 18.6667px;"]').text().substring(3,4),
            twodigit_1: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 21.9882%;"] > span[style="font-size: 18.6667px;"]').text().substring(0,1),
            twodigit_2: $(element).find('td[style="border-collapse: collapse; text-align: center; border-style: solid; border-color: #f5bd73; width: 21.9882%;"] > span[style="font-size: 18.6667px;"]').text().substring(1,2),
            createdate: $(element).find('td[style="width: 26.3449%; border-collapse: collapse; background-color: #f0cf89; text-align: center; border-style: solid; border-color: #f5bd73;"] > span[style="font-size: 12pt;"] > strong > span[style="color: #800000;"]').text().trim().split("/").slice(0, 2).join()
        })) || []
        
        for (let i = 0; i < result.length; i++) {
            if(result[i].fourdigit == "" || result[i].fourdigit == "รอผล"){
                console.log("Enter If")
                // result = result.filter(x => x.fourdigit !== "")
                // result = result.filter(x => x.fourdigit !== "รอผล")
                console.log(i)
            }
            else{
                
                //console.log("Enter Else" + " " + result[i].fourdigit)
                var delayInMilliseconds = 1000; //1 second
                setTimeout(function() {
                    //let datadate = result[i].createdate[0].concat(result[i].createdate[1],"/",result[i].createdate[3],result[i].createdate[4],"/","2565")
                    let datadate = "2022".concat("-",result[i].createdate[3],result[i].createdate[4],"-",result[i].createdate[0],result[i].createdate[1])
                    //console.log(result[i].createdate[0].concat(result[i].createdate[1],"/",result[i].createdate[3],result[i].createdate[4],"/","2565"))
                    console.log('insert into hanoi (fourdigit, threedigit,twodigit,fourdigit_1,fourdigit_2,fourdigit_3,fourdigit_4,twodigit_1,twodigit_2, createdate) values('+result[i].fourdigit+','+result[i].threedigit+','+result[i].twodigit+','+result[i].fourdigit_1+', '+result[i].fourdigit_2+', '+result[i].fourdigit_3+', '+result[i].fourdigit_4+', '+result[i].twodigit_1+', '+result[i].twodigit_2+' ,"'+datadate+'")')
                    dbCon.query('insert into hanoi (fourdigit, threedigit,twodigit,fourdigit_1,fourdigit_2,fourdigit_3,fourdigit_4,twodigit_1,twodigit_2, createdate) values('+result[i].fourdigit+','+result[i].threedigit+','+result[i].twodigit+','+result[i].fourdigit_1+', '+result[i].fourdigit_2+', '+result[i].fourdigit_3+', '+result[i].fourdigit_4+', '+result[i].twodigit_1+', '+result[i].twodigit_2+' ,"'+ datadate+'")')
                }, delayInMilliseconds);
            }
        }

        // return res.status(200).send({
        //     message: "Success",
        //     result
        // })

    }catch(err){
        console.log(err.message)
    }
})

//home page route
app.get('/', (req, res) => {
    return res.send({
        error: false, message: 'My First Time For Node.JS',
        written_by: 'Kanabut Puangpaka'
    })
})

//connection to mysql
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lemon1234',
    database: 'lottodb'
})
dbCon.connect();

// retrieve all hanoi result
app.get('/hanoi', (req, res) => {
    dbCon.query('select * from hanoi', (error, result, fields) =>{
        if(error) throw error;
        let message = ""
        if (result === undefined || result.length == 0){
            message= "No data";
        }
        else{
            message = "Successfully";
        }
        return res.send({
            error: false, 
            data: result, 
            message: message
        })
    })
})

//Create hanoi lotto
app.post('/createhanoi', (req, res) => {
    let threedigit = req.body.threedigit
    let twodigit = req.body.twodigit
    let createdate = Date.now()

    if(!threedigit || !twodigit){
        return res.status(400).send({
            error: true,
            message: "Please input the number complate"
        })
    }
    else{
        dbCon.query('insert into hanoi (threedigit, twodigit, createdate) values(?,?,Now())', [threedigit, twodigit, createdate], (error, results, fields) => {
            if(error) throw error
            return res.send({
                error: false,
                data: results,
                message: "Data was added"
            })
        })
    }
})

//Get hanoi by date
app.get('/hanoi/:createdate', (req, res) => {
    let createdate = req.params.createdate
    if(!createdate){
        return res.status(400).send({
            error: true,
            message: "Data no found"
        })
    }
    else{
        dbCon.query("select threedigit, twodigit from hanoi where createdate = ?" , createdate, (error, result, field) =>{
            if(error) throw error
            let message = ""
            if(result.length === undefined || result.length == 0){
                message = "Data not found"
            }
            else{
                message = "Success"
            }

            return res.send ({
                error: false,
                data: result[0],
                message: message
            })
        })
    }
})

//Update hanoi 
app.put('/hanoi/:id', (req, res) => {
    let id = req.params.id
    let threedigit = req.body.threedigit
    let twodigit = req.body.twodigit

    if(!threedigit || !threedigit){
        return res.status(400).send({
            error: true,
            message: 'please input data'
        })
    }
    else{
        dbCon.query('update hanoi  set threedigit = ?, twodigit = ? where id = ?', [threedigit, twodigit, id] , (error, results, field) =>{
            if(error)throw error
            let message = ""
            if(results.changeRows === 0){
                message = "data is be the same"
            }
            else{
                message = "Data was update"
            }

            return res.send({
                error: false,
                data: results,
                message: message
            })
        })
    }
})

//Delete data
app.delete('/deletehanoi', (req, res) =>{
    let id = req.body.id
    if(!id){
        return res.status(400).send({ 
            error: true,
            message: "Please fill id"
        })
    }
    else {
        dbCon.query('delete from hanoi where id = ?', [id], (error, result, field) => {
            if(error)throw error
            let message = ""
            if(result.affectedRows === 0){
                message = "Data not found"
            }
            else{
                message = "Data was delete"
            }

            return res.send({
                error: false,
                data: result,
                message: message
            })
        })
    }
})

app.listen(3000, () => {
    console.log('Server is started on port 3000')
})

module.exports = app;