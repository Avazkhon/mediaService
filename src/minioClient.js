import Minio from 'minio';
import password from '../password.js';
const minioClient = new Minio.Client({
  endPoint: '172.20.0.2',
  port: 9000,
  useSSL: false,
  accessKey: password.minioClient.accessKey,
  secretKey: password.minioClient.secretKey,
});

export default minioClient
