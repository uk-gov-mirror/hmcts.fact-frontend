
export const mockResponse = () => {
  const res: any = {};
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};
