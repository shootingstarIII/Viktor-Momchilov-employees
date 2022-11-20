import { useState } from 'react';
import { formatDateIntoDays, longestWorkingPair } from './utils';
import { finalResult } from './calculateResult';
import './App.css';
import Table from './components/Table';

function App() {
  const HEADINGS = new Array();
  const [fileData, setFileData] = useState([
    {
      empOne: 'EmployeeID #1',
      empTwo: 'EmployeeID #2',
      projectId: 'Project ID',
      daysWorked: 'Days worked',
      error: '',
    },
  ]);
  const [toggle, setToggle] = useState(true);

  function handleChange(event) {
    const fileReader = new FileReader();

    fileReader.readAsText(event.target.files[0]);

    fileReader.onload = function () {
      if (!fileReader.error) {
        const dataRowsArray = handleInputData(fileReader.result);

        // the information on the file after it has been sorted in arrays

        const dataConvertedDates = formatDateIntoDays(dataRowsArray);

        // all the dates have been converted into milliseconds

        const dataRowsObjects = formatToObjects(dataConvertedDates);

        // all the arrays have been converted into objects

        const twoEmployeesOrMoreOnProject = finalResult(dataRowsObjects);

        // all the projects that have more than 1 employee involved

        const dataResults = longestWorkingPair(twoEmployeesOrMoreOnProject);

        // the employees that have the longest working time on each project

        setFileData((prevFileData) => [prevFileData, ...dataResults].flat());
        setToggle((prevToggle) => !prevToggle);
      } else {
        fileData.error =
          'There has been an error with the current file upload. Please upload a new one';
      }
    };
  }

  function handleInputData(data) {
    const dataRows = data.split('\n');

    dataRows[0].split(',').forEach((row) => HEADINGS.push(row.trim()));
    return dataRows
      .filter((row, index) => row.trim().length && index !== 0)
      .map((row) => row.split(',').map((str) => str.trim()));
  }

  // changes the provided string from the file to an array and also adds elements to the HEADING array

  function formatToObjects(data) {
    return data.map((array) =>
      array.reduce((objOfData, item, index) => {
        return { ...objOfData, [HEADINGS[index]]: item };
      }, new Object())
    );
  }

  // changes the array of arrays in to an array of objects for better usage

  function handleReset(event) {
    event.preventDefault();
    setFileData([
      {
        empOne: 'EmployeeID#1',
        empTwo: 'EmployeeID#2',
        projectId: 'ProjectID',
        daysWorked: 'Days worked',
        error: '',
      },
    ]);
    setToggle((prevToggle) => !prevToggle);
  }

  // resets the state of fileData and toggle to the initial inputs so a new file can be used

  const tableElements = fileData.map((table, index) =>
    index === 0 ? (
      <thead>
        <Table index={index} table={table} />
      </thead>
    ) : (
      <tbody>
        <Table index={index} table={table} />
      </tbody>
    )
  );

  // sends the information as props to the functional component for rendering

  return (
    <>
      {toggle ? (
        <section>
          <h1>
            Upload a file to identify the pair of employees who have worked
            together on common projects for the longest period of time.
          </h1>
          <label>
            Upload File
            <input
              id="upload-btn"
              type="file"
              accept=".csv"
              onChange={handleChange}
            />
          </label>
        </section>
      ) : (
        <section>
          <table>{tableElements}</table>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </section>
      )}
    </>
  );
}

export default App;
