const {app} = require('../../../app');
const {User} = require('../../../models');

app.get('/api/read/user', async function(req,res){
    let id = req.query.id;
    let user = await User.findByPk(id,{
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    })

    let result = {
        formFieldValues:user,
        modalShow:'#formModal',
        updatedUrl:"user?id=" + user.id
    }
    return res.json(result);
});