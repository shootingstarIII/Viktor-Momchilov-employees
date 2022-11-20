import styles from './table.module.css';

export default function Table(props) {
  if (!props.table.error) {
    if (props.index === 0) {
      return (
        <tr>
          <th>{props.table.empOne}</th>
          <th>{props.table.empTwo}</th>
          <th>{props.table.projectId}</th>
          <th>{props.table.daysWorked}</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{props.table.empOne}</td>
          <td>{props.table.empTwo}</td>
          <td>{props.table.projectId}</td>
          <td>{props.table.daysWorked}</td>
        </tr>
      );
    }
  } else {
    return <p>{props.table.error}</p>;
  }
}
