import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import api from "./../../service/api";
import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import { NotificationManager } from 'react-notifications'
import { Button } from 'react-bootstrap';
import {BsFillTrashFill} from "react-icons/bs"


function Table({ columns, data }) {
  
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({columns, data,})

  // Render the UI for your table
  return (
    <BTable striped hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
  )
}

const List = () => {


  const [categories, setCategories] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
          {
            Header: 'Category name',
            accessor: 'name',
          },
          {
            Header: 'Tax',
            Cell: ({row}) => {
              var tax = row.original.tax;
              return parseFloat(tax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '%'
            }
          },
          {
            Header: ' ',
            Cell: ({row}) => {
              var category_id = row.original.id;
              
              const Delete = function (category_id) {
                if(category_id > 0){
                  api.post("category/delete.php", {id: category_id}).then((response) => {
                    if(response.data.status === 'success'){
                      NotificationManager.success('Category deleted with success!', 'Success!');
                      getCategories();
                    }
                    else{
                      NotificationManager.error(response.data.message, 'Error!');
                    }
                  })
                  .catch((err) => {
                    NotificationManager.error('Oops! Unable delete category. Try again.', 'Error');
                  });
                }
              }

              return <Button variant="secondary" size="sm" onClick={() => Delete(category_id)}><BsFillTrashFill /></Button>
            }
          },
        ],
      }
    ],
    []
  )

  async function getCategories () {
    try {
      const categories = await api.get('category/get.php');
      setCategories(categories.data);
    } catch (error) {
      NotificationManager.error('Oops! Unable to load categories. Reload the page, please.', 'Error!');
    }
  }

  useEffect(() => {
      getCategories();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'><h2>Category</h2><h6 className='subtitle'>List</h6></div>
      </div>
      <div className='row'>
        <div className='col'>
          <hr></hr>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {categories.length > 0 && <Table columns={columns} data={categories} />}
          {
            categories.length === 0 && 
            <Alert key="secondary" variant="secondary">
                No record =(
            </Alert>
          }
        </div>
      </div>
    </div>
  );
};

export default List;