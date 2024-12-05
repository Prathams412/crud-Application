const {app} = require('../../../app');
const {User} = require('../../../models') ;

app.post('/api/create/user', async function(req, res){
    const {
        name,
        mobile,
        email,
    } = req.body;
    

    let err = [];

    if(!name){
        err.push('Name is required');
    }

    if(!mobile){
        err.push('Mobile is required');
    }

    if(!email){
        err.push('Email is required');
    }
    

    if(err.length){
        let result = {
            swal: {
                icon:'error',
                title:'Error',
                html:err.join('<br>'),
                keydownListenerCapture:true
            }
        }
        res.json(result);
    }else{
        let user = await User.create({
            name,
            email,
            mobile
        });

        let result = {
            user,
            // row:`<tr><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td></tr>`,
            addRowTable:'#users-table tbody',
            swal: {
                icon:'success',
                title:'Success',
                html:'User created',
                keydownListenerCapture:true
            },
            formReset:true,
            modalHide:'#formModal'
        }
        res.json(result);
    }
});