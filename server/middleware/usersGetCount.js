import dbGetUsersCount from '../../database/dbGetUsersCount';

const usersGetCount = function (req, res) {

        const login = req.query.login;

         dbGetUsersCount(login, (countUsers) => {
           res.status(200).json({
                count: countUsers,
                message: 'Кол-во юзеров стаким логином'
            });
         });

};

export default usersGetCount;
