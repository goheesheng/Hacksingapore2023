import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { ListOneVcWrapper } from './upload.styled';
import * as S from './CredentialForm.styled';
import { Container, Header, Input, Spinner } from 'components'
import { JSONLD_CONTEXT_URL } from 'utils/schema'
import { messages } from 'utils/messages'
import { useAuthContext } from 'hooks/useAuthContext'
import { showErrorToast } from 'utils/notification'
import { ErrorCodes } from 'enums/errorCodes'
import { initialValues, useCredentialForm } from './useCredentialForm'

interface MergedComponentProps {
  downloadURL: string;
  metadata: {
    name: string;
    timeCreated: string;
  };
  isImage: boolean;
}


const MergedComponent: FC<MergedComponentProps> = ({
  downloadURL,
  metadata,
  isImage,
}) => {
  const router = useRouter();
  const { authState } = useAuthContext();
  const { handleSubmit, validate, isCreating, error } = useCredentialForm();
  const [isFileImage, setIsFileImage] = useState(isImage);

  useEffect(() => {
    if (error) {
      if (
        error.response?.data?.error?.code === ErrorCodes.INTERNAL_SERVER_ERROR
      ) {
        showErrorToast(new Error(messages.issuer.error.apiError));
      } else {
        showErrorToast(error);
      }
    }
  }, [error]);

  if (!authState.authorizedAsIssuer) {
    return <Spinner />;
  }

  return (
    <ListOneVcWrapper>
      
      <Header title="Enter details" />
      <Container>
      <div className='grid lg:grid-cols-2 gap-x-8'>
      <S.ImageWrapper>
      {isFileImage ? (
        <img src={downloadURL} alt="Selected Image" width="300" />
      ) : (
        <button
          onClick={() => {
            window.open(downloadURL, '_blank');
          }}
        >
          Download File
        </button>
      )}
    </S.ImageWrapper>

        <S.FormContainer className='lg:col-span-8 lg:col-start-2'>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validate}
            >
              {(formikProps) => (
                <form id='form' onSubmit={formikProps.handleSubmit}>
                  <S.Title variant='p1'>
                    Please fill in the form below to issue a certificate.
                  </S.Title>

                  <Input label='Schema URL' value={JSONLD_CONTEXT_URL} disabled />

                  <S.Heading variant='h6'>Certificate details</S.Heading>

                  <div className='grid lg:grid-cols-2 lg:gap-x-8'>
                    <S.InputWrapper
                      label='Owner Name'
                      placeholder={`Enter Owner's Name`} // Add a conditional check for 'metadata'
                      name='Owner'
                      maxLength={100}
                      value={formikProps.values.Owner}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.Owner
                          ? Boolean(formikProps.errors.Owner)
                          : false
                      }
                      helpText={
                        formikProps.touched.Owner
                          ? formikProps.errors.Owner
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Property Address'
                      placeholder="Enter Owner's Property Address"
                      name='PropertyAddress'
                      maxLength={500}
                      value={formikProps.values.PropertyAddress}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.PropertyAddress
                          ? Boolean(formikProps.errors.PropertyAddress)
                          : false
                      }
                      helpText={
                        formikProps.touched.PropertyAddress
                          ? formikProps.errors.PropertyAddress
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Date of purchase'
                      name='dateOfPurchase'
                      type='date'
                      value={formikProps.values.dateOfPurchase}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.dateOfPurchase
                          ? Boolean(formikProps.errors.dateOfPurchase)
                          : false
                      }
                      helpText={
                        formikProps.touched.dateOfPurchase
                          ? formikProps.errors.dateOfPurchase
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Postal Code'
                      placeholder="Enter Owner's Postal Code"
                      name='PostalCode'
                      maxLength={500}
                      value={formikProps.values.PostalCode}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.PostalCode
                          ? Boolean(formikProps.errors.PostalCode)
                          : false
                      }
                      helpText={
                        formikProps.touched.PostalCode
                          ? formikProps.errors.PostalCode
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>
                  <div className='grid lg:grid-cols-2 lg:gap-x-8'>
                  <S.InputWrapper
                      label='Lease (Years)'
                      name='Lease'
                      maxLength={100}
                      placeholder='Enter Lease'
                      value={formikProps.values.Lease}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.Lease
                          ? Boolean(formikProps.errors.Lease)
                          : false
                      }
                      helpText={
                        formikProps.touched.Lease ? formikProps.errors.Lease : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label='Unit Number'
                      name='UnitNo'
                      maxLength={100}
                      placeholder='Enter Unit Number'
                      value={formikProps.values.UnitNo}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.UnitNo
                          ? Boolean(formikProps.errors.UnitNo)
                          : false
                      }
                      helpText={
                        formikProps.touched.UnitNo ? formikProps.errors.UnitNo : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Owner's Email"
                      name='Email'
                      type='email'
                      placeholder="Enter Owner's Email"
                      maxLength={100}
                      value={formikProps.values.Email}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.Email
                          ? Boolean(formikProps.errors.Email)
                          : false
                      }
                      helpText={
                        formikProps.touched.Email
                          ? formikProps.errors.Email
                          : ''
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <div className='grid lg:grid-cols-1'>
                    <S.ButtonWrapper
                      type='submit'
                      form='form'
                      disabled={!(formikProps.isValid && formikProps.dirty)}
                      loading={isCreating}
                    >
                      Issue certificate
                    </S.ButtonWrapper>
                  </div>
                </form>
              )}
            </Formik>
          
        </S.FormContainer>
        </div>
      </Container>
    </ListOneVcWrapper>
  );
};

MergedComponent.getInitialProps = async ({ query }) => {
  const { downloadURL, metadata } = query;
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const fileExtension = downloadURL.split('.').pop().toLowerCase();

  try {
    const isImage = imageExtensions.includes(fileExtension);
    return { downloadURL, metadata: JSON.parse(metadata), isImage };
  } catch (error) {
    console.error('Error parsing metadata:', error);
    return { downloadURL, metadata: {}, isImage: false };
  }
};


export default MergedComponent;
