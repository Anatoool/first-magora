import { addUser } from '../../database/dbUser';

const usersRegistration = function (req, res) {

         var user = req.body.user;
         user = JSON.parse(user);
         console.log(user);
         addUser(user.login,
                    user.password,
                    user.email, (value) => {
                      console.log('Пользователь добавлен', value);
                      res.json({user: 'add'});
                    });

};

export default usersRegistration;
