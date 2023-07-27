import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wobackend',
});

export async function getServices() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM services', (error, results) => {
          if (error) {
            reject(error);
          } else {
            const services = results.map((service) => ({
              id: service.id,
              title: service.title,
              icon: service.icon,
              description: service.description,
            }));
            resolve(services);
          }
        });
      });
}

