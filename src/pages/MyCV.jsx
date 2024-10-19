import { useState, useEffect, useContext } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';
import { Separator } from '@/components/ui/separator';
import ExperiencesDetails from '@/components/ExperiencesDetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// URL backend
const VITE_BACK_URL =
  import.meta.env.VITE_BACK_URL ||
  'https://express-mongodb-k76a.onrender.com/api';

// Utilitaire pour convertir un objet Date en chaîne de caractères format YYYY-MM-DD
function formatDateForInput(date) {
  if (!date) return ''; // Si la date est null ou undefined
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

// // Utilitaire pour reconvertir la date en objet Date avant l'envoi au serveur
// function dateString) === "" ? null : exp.endDate {
//   return dateString ? new Date(dateString) : null; // Si la date est fournie, sinon null
// }

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Provided Name is invalid')
    .required('Name is required'),
  description: Yup.string()
    .min(3, 'Provided Description is invalid')
    .required('Description is required'),
  isPublic: Yup.boolean().required('Provided isPublic is invalid'),
  educationalExperiences: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .min(3, 'Provided Educational Experience Name is invalid')
        .required('Education name is required'),
      description: Yup.string()
        .min(3, 'Provided Educational Experience Description is invalid')
        .nullable(true),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().nullable().nullable(true),
    })
  ),
  professionalExperiences: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .min(3, 'Provided Professional Experience Name is invalid')
        .required('Experience name is required'),
      description: Yup.string()
        .min(3, 'Provided Professional Experience Description is invalid')
        .nullable(true),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().nullable().nullable(true),
    })
  ),
});

function MyCV() {
  const { user } = useContext(UserContext);
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getCv() {
      if (!user) return;
      try {
        const response = await fetch(`${VITE_BACK_URL}/cv/user/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 404) {
          setCvData(null); // No CV found
        } else if (!response.ok) {
          throw new Error('Failed to fetch CV');
        } else {
          const data = await response.json();

          // Convert dates from MongoDB to the YYYY-MM-DD format for the form
          const formattedData = {
            ...data,
            educationalExperiences: data.educationalExperiences.map((exp) => ({
              ...exp,
              startDate: formatDateForInput(exp.startDate),
              endDate: formatDateForInput(exp.endDate),
            })),
            professionalExperiences: data.professionalExperiences.map(
              (exp) => ({
                ...exp,
                startDate: formatDateForInput(exp.startDate),
                endDate: formatDateForInput(exp.endDate),
              })
            ),
          };

          setCvData(formattedData);
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching CV.');
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
    getCv();
  }, [user, token]);

  // Default initial values for the form
  const defaultInitialValues = {
    name: '',
    description: '',
    isPublic: false,
    educationalExperiences: [
      { name: '', description: '', startDate: '', endDate: '' },
    ],
    professionalExperiences: [
      { name: '', description: '', startDate: '', endDate: '' },
    ],
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${VITE_BACK_URL}/cv/${cvData._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete CV');
      }
      navigate('/allcvs');
    } catch (error) {
      setErrorMessage('An error occurred while deleting CV.');
      toast.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}

      <Formik
        initialValues={cvData || defaultInitialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Convert date strings back to ISODate before sending to server
            const payload = {
              ...values,
              educationalExperiences: values.educationalExperiences.map(
                (exp) => ({
                  ...exp,
                  description: exp.description === '' ? null : exp.description,
                  endDate: exp.endDate === '' ? null : exp.endDate,
                })
              ),
              professionalExperiences: values.professionalExperiences.map(
                (exp) => ({
                  ...exp,
                  description: exp.description === '' ? null : exp.description,
                  endDate: exp.endDate === '' ? null : exp.endDate,
                })
              ),
            };

            const response = await fetch(
              cvData
                ? `${VITE_BACK_URL}/cv/${user?.id}`
                : `${VITE_BACK_URL}/cv`,
              {
                method: cvData ? 'PUT' : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
              }
            );
            if (!response.ok) {
              throw new Error('Failed to save CV');
            }
            toast.success('CV save');
            navigate('/allcvs');
          } catch (error) {
            setErrorMessage('An error occurred while saving CV.');
            toast.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Field as={Input} name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Field as={Input} name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="isPublic">Public</Label>
              <Field type="checkbox" name="isPublic" className="h-4 w-4" />
              <ErrorMessage
                name="isPublic"
                component="div"
                className="text-red-500"
              />
            </div>

            <Separator className="my-8" />

            <ExperiencesDetails
              Input={Input}
              title="Educational Experiences"
              values={values.educationalExperiences}
              buttonText="Education"
              fieldname="educationalExperiences"
            />

            <Separator className="my-8" />

            <ExperiencesDetails
              Input={Input}
              title="Professional Experiences"
              values={values.professionalExperiences}
              buttonText="Experience"
              fieldname="professionalExperiences"
            />

            <Separator className="my-8" />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save CV'}
            </Button>
          </form>
        )}
      </Formik>

      <Button variant="destructive" onClick={handleDelete} className="mt-4">
        Delete CV
      </Button>
    </div>
  );
}

export default MyCV;
