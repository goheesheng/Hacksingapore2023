import React, { useState, useEffect } from 'react';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, getMetadata } from 'firebase/storage';
import { ROUTES } from 'utils'
import { useRouter } from 'next/router'
import { ButtonWrapper } from './upload.styled';
import { stringify } from 'querystring';

function ListAllVc() {
  
  const router = useRouter()

  // States for data and image
  const [data, setData] = useState([]);
  const [image, setImage] = useState('');

  const isImageFile = (filename) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const fileExtension = filename.split('.').pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };
  

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

  const listOneVcClick = (downloadURL, metadata) => {
    const queryParams = stringify({
      downloadURL,
      metadata: JSON.stringify(metadata),
    });
    router.push(`${ROUTES.issuer.listOneVc}?${queryParams}`);
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
              <th style={{ width: '20%' }}>Document</th>
              <th style={{ width: '20%' }}>Created</th>
              <th style={{ width: '10%' }}>Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {isImageFile(item.name) ? (
                  <img src={item.downloadURL} alt={item.name} width="300" style={{ display: 'block' }} />
                ) : (
                  <div style={{ textAlign: 'center', width: '300px' }}>
                    <span style={{ display: 'block', lineHeight: '6' }}>{item.name}</span>
                  </div>
                )}
              </td>

                <td>{item.metadata.timeCreated}</td>
                <td>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ButtonWrapper
                  type="primary"
                  onClick={() => listOneVcClick(item.downloadURL, item.metadata)}
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
