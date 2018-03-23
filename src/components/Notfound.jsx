import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => (
  <div>
    Страница не найдена. Вернуться на <Link to='/homepage/1'>главную</Link>?
  </div>
);

export default Notfound;
