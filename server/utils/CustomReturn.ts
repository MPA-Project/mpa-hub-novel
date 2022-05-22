const CustomReturn = (res, statusCode: number, data: any) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  return res.end()
}

export default CustomReturn;