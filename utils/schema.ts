export const JSONLD_CONTEXT_URL =
  "https://schema.affinidi.com/OwnedPropertyV1-4.jsonld";
  // https://schema.affinidi.com/EducationCertificateV1-0.jsonld
  /*

{
  "@context": {
    "OwnedProperty": {
      "@id": "https://schema.affinidi.com/OwnedPropertyV1-3.jsonld",
      "@context": {
        "@version": 1.1,
        "@protected": true
      }
    },
    "Owner": {
      "@id": "schema-id:Owner",
      "@type": "https://schema.org/Text"
    },
    "PropertyAddress": {
      "@id": "schema-id:PropertyAddress",
      "@type": "https://schema.org/Text"
    },
    "UnitNo": {
      "@id": "schema-id:UnitNo",
      "@type": "https://schema.org/Text"
    },
    "PostalCode": {
      "@id": "schema-id:PostalCode",
      "@type": "https://schema.org/Text"
    },
    "Lease": {
      "@id": "schema-id:Lease",
      "@type": "https://schema.org/Text"
    },
    "Email": {
      "@id": "schema-id:Email",
      "@type": "https://schema.org/Text"
    },
    "dateOfPurchase": {
      "@id": "schema-id:dateOfPurchase",
      "@type": "https://schema.org/Date"
    }
  }
}

*/

/* 
This is https://schema.affinidi.com/EducationCertificateV1-0.jsonld

{
  "@context": {
    "EducationCertificate": {
      "@id": "https://schema-manager.prod.affinity-project.org/EducationCertificateV1-0.jsonld",
      "@context": {
        "@version": 1.1,
        "@protected": true
      }
    },
    "courseTitle": {
      "@id": "schema-id:courseTitle",
      "@type": "https://schema.org/Text"
    },
    "institution": {
      "@id": "schema-id:institution",
      "@type": "https://schema.org/Text"
    },
    "dateOfCompletion": {
      "@id": "schema-id:dateOfCompletion",
      "@type": "https://schema.org/Date"
    },
    "student": {
      "@id": "schema-id:student",
      "@context": {
        "name": {
          "@id": "schema-id:name",
          "@type": "https://schema.org/Text"
        },
        "email": {
          "@id": "schema-id:email",
          "@type": "https://schema.org/Text"
        }
      }
    }
  }
}
*/