export function finalResult(data) {
  const arrayWithResult = new Array();
  const arrayOfProjects = data
    .map((item) => item.ProjectId)
    .reduce(
      (filteredArr, item) =>
        filteredArr.includes(item) ? filteredArr : [...filteredArr, item],
      []
    );

  for (let i = 0; i < arrayOfProjects.length; i++) {
    const employeesOnEachProject = [...data].filter(
      (item) => item.ProjectId === arrayOfProjects[i]
    );

    // finds the employees for each individual project

    if (employeesOnEachProject.length > 1) {
      const timeOnEachProject = new Array();

      for (let i = 0; i < employeesOnEachProject.length - 1; i++)
        for (let j = i + 1; j < employeesOnEachProject.length; j++) {
          let firstEmp = employeesOnEachProject[i];
          let secondEmp = employeesOnEachProject[j];

          if (
            (firstEmp.DateTo <= secondEmp.DateTo &&
              firstEmp.DateTo > secondEmp.DateFrom) ||
            (secondEmp.DateTo <= firstEmp.DateTo &&
              secondEmp.DateTo > firstEmp.DateFrom)
          ) {
            let startDate =
              firstEmp.DateFrom > secondEmp.DateFrom
                ? firstEmp.DateFrom
                : secondEmp.DateFrom;
            let endDate =
              firstEmp.DateTo < secondEmp.DateTo
                ? firstEmp.DateTo
                : secondEmp.DateTo;
            let days = Math.ceil(endDate - startDate);
            timeOnEachProject.push({
              empOne: firstEmp.EmpID,
              empTwo: secondEmp.EmpID,
              projectId: employeesOnEachProject[i].ProjectId,
              daysWorked: days,
            });
          }
        }
      timeOnEachProject.sort((a, b) => b.daysWorked - a.daysWorked);

      // sorts the objects by an decrementing order of the days worked by 2 employees on the same project

      arrayWithResult.push(timeOnEachProject);
    }
  }

  return arrayWithResult;
}
