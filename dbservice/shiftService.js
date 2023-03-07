async function getShiftAssignments(startDate, endDate) {
  const url = `http://192.168.50.230:8888/Employee/GetShiftAssignments?startDate=${startDate}&endDate=${endDate}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
export default getShiftAssignments;