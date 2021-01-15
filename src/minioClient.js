import Minio from 'minio';
import password from '../password.js';
const minioClient = new Minio.Client({
  endPoint: '172.17.0.1',
  port: 9000,
  useSSL: false,
  accessKey: password.minioClient.accessKey,
  secretKey: password.minioClient.secretKey,
});

export default minioClient
