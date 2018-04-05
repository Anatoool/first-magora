import { dbGetUsersCount } from '../../database/dbUser';

const usersGetCount = function (req, res) {

        const login = req.query.login;
         dbGetUsersCount(login, (err, countUsers) => {
           if (!err) {
             if (countUsers > 0) {
               res.status(200).json({busy: true});
             } else {
               res.status(200).json({busy: false});
             }
           }
         });

};

export default usersGetCount;
