import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => (
  <div>
    Страница не найдена. Вернуться на <Link to='/homepage'>главную</Link>?
  </div>
);

export default Notfound;
