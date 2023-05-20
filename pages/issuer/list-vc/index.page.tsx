import React, { useState, useEffect } from 'react';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, getMetadata } from 'firebase/storage';
import { ROUTES } from 'utils'
import { useRouter } from 'next/router'
import { ButtonWrapper } from './upload.styled';
function ListAllVc() {
  
  const router = useRouter()

  // States for data and image
  const [data, setData] = useState([]);
  const [image, setImage] = useState('');

  // List All Files
  const listItem = () => {
    const storageRef = ref(storage, 'image/');
    listAll(storageRef)
      .then(async (res) => {
        const itemsWithMetadata = await Promise.all(
          res.items.map(async (itemRef) => {
            const downloadURL = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            return {
              name: itemRef.name,
              downloadURL,
              metadata,
            };
          })
        );
        setData(itemsWithMetadata);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    listItem();
  }, []);

  const listOneVcClick = () => {
    // Handle button click event here
    router.push(ROUTES.issuer.listOneVc)
  };

  return (
    <div className="App" style={{ marginTop: 70 }}>
      <center>
        <style>
          {`
            table {
              height: auto;
              border-collapse: collapse;
            }
            th, td {
              border: 0.5px solid black;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f2f2f2;
            }
          `}
        </style>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Row Number</th>
              <th style={{ width: '10%' }}>Name</th>
              <th style={{ width: '20%' }}>Image</th>
              <th style={{ width: '20%' }}>Created</th>
              <th style={{ width: '10%' }}>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={item.downloadURL} alt={item.name} width="300" />
                </td>
                <td>{item.metadata.timeCreated}</td>
                <td>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonWrapper
                    type="primary"
                    onClick={listOneVcClick}
                    style={{ color: 'white' }}
                >
                    View
                </ButtonWrapper>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
  
}
  
export default ListAllVc;
