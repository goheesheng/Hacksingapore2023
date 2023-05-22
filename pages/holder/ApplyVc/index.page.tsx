import { Card, Input, List, message, Image, Progress, Button } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from '../../../firebaseConfig.ts';
import { Container, FormContainer, ButtonWrapper, MT5, TextRight } from './upload.styled';

const UploadImageToStorage = () => {
  const [imageFile, setImageFile] = useState<File>()
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  
  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0])

      console.log(files[0])
    } else {
      message.error('File size to large')
    }
  }

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const metadata = {
        contentType: imageFile.type,
        customMetadata: {
          title: formData.title || "",
          description: formData.description || "",
        },
      };
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgressUpload(progress) // to show progress upload

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          message.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url)
          })
        },
      )
    } else {
      message.error('File not found')
    }
  }

  const handleRemoveFile = () => setImageFile(undefined)

  return (
    <Container>
      <FormContainer>
        <Input
          type="file"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <MT5>
          <Card>

            {imageFile && (
              <>
                <List.Item>
                  <List.Item.Meta
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
                  />
                </List.Item>

                <TextRight className="mt-3">
                  <ButtonWrapper
                    loading={isUploading}
                    type="primary"
                    onClick={handleUploadFile}
                    style={{ backgroundColor: '#4a90e2', color: 'white' }}
                  >
                    Upload
                  </ButtonWrapper>

                  <Progress percent={progressUpload} />
                </TextRight>
              </>
            )}

            {downloadURL && (
              <>
                    <p>
                    <Button
                      href={downloadURL}
                      target="_blank"
                      size="small"
                      type="primary"
                    >
                      Document Link
                    </Button>
                  </p>
              </>
            )}
            <p></p>
          </Card>
        </MT5>
      </FormContainer>
    </Container>
  );
};

export default UploadImageToStorage;