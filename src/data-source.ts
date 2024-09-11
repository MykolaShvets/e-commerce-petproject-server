import { DataSource } from 'typeorm';
import dbconfig from './dbconfig';

const dataSource = new DataSource(dbconfig);

export default dataSource;
