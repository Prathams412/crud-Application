const {app} = require('../../../app');
const {User} = require('../../../models') ;

app.post('/api/delete/user', async function(req, res){
    const {id} = req.query;
    

    let user = await User.destroy({
        where:{id}
    })

    if(user){
        let result = {
            deleteRowTable:true,
            swal: {
                icon:'success',
                title:'Success',
                html:'User Deleted',
                keydownListenerCapture:true
            }
        }
        return res.json(result);
    }
    let result = {
        swal: {
            icon:'error',
            title:'Error',
            html:"Try Again",
            keydownListenerCapture:true
        }
    }
   return res.json(result);
});