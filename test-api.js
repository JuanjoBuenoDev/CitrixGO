import axios from 'axios';

axios.get('http://localhost:8080/api/citrix/ddcs')
  .then(res => {
    console.log('Respuesta:', res.data);
  })
  .catch(err => {
    console.error('Error en llamada API:', err.message);
  });
