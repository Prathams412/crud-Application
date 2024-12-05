const {app} = require('../../../app');
const {User} = require('../../../models') ;

app.post('/api/update/user', async function(req, res){

    let id = req.query.id;
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
        let user = await User.findByPk(id);
        if (!user) {
            let result = {
              swal: {
                icon: "error",
                title: "Error",
                html: "User not found",
                keydownListenerCapture: true,
              },
            };
            res.json(result);
          }else{
            user.name = name;
            user.mobile = mobile;
            user.email = email;

            await user.save();

            let result = {
                user,
                updateRowTable:'#users-table tbody',
                swal: {
                    icon:'success',
                    title:'Success',
                    html:'User Updated',
                    keydownListenerCapture:true
                },
                modalHide:'#formModal'
            }
            res.json(result);
          }
    }
});