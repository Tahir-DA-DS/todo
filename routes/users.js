const express = require('express')
const router = express.Router()
const {signUp, login}= require('../controllers/user')



router.get('/signup', (req, res)=>{
    res.render('signup.ejs')
})

router.post('/signup', async(req, res)=>{
    try {
        const {username, password} = req.body
        const userResponse = await signUp(username, password)
    
        if(userResponse.code == 200 ){
            res.redirect('/login')
        } else { res.redirect('/') }
    } catch (error) {
        console.log(error);
    }
})

router.get('/login', (req, res)=>{
    res.render('login.ejs')
})

router.post('/login', login)


module.exports = router