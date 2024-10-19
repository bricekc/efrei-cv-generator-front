import { ErrorMessage, Field, FieldArray } from 'formik';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import PropTypes from 'prop-types';

function ExperiencesDetails({ values, Input, title, buttonText }) {
  return (
    <>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <FieldArray name="educationalExperiences">
        {({ remove, push }) => (
          <>
            {values.map((_, index) => (
              <Card key={index} className="grid gap-2 mb-4 p-4">
                <Label htmlFor={`educationalExperiences[${index}].name`}>
                  Name
                </Label>
                <Field
                  as={Input}
                  name={`educationalExperiences[${index}].name`}
                />
                <ErrorMessage
                  name={`educationalExperiences[${index}].name`}
                  component="div"
                  className="text-red-500"
                />
                <Label htmlFor={`educationalExperiences[${index}].description`}>
                  Description
                </Label>
                <Field
                  as={Input}
                  name={`educationalExperiences[${index}].description`}
                />
                <ErrorMessage
                  name={`educationalExperiences[${index}].description`}
                  component="div"
                  className="text-red-500"
                />
                <Label htmlFor={`educationalExperiences[${index}].startDate`}>
                  Start Date
                </Label>
                <Field
                  type="date"
                  name={`educationalExperiences[${index}].startDate`}
                />
                <ErrorMessage
                  name={`educationalExperiences[${index}].startDate`}
                  component="div"
                  className="text-red-500"
                />
                <Label htmlFor={`educationalExperiences[${index}].endDate`}>
                  End Date
                </Label>
                <Field
                  type="date"
                  name={`educationalExperiences[${index}].endDate`}
                />
                <ErrorMessage
                  name={`educationalExperiences[${index}].endDate`}
                  component="div"
                  className="text-red-500"
                />
                <Button
                  variant="destructive"
                  className="mt-4"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete {buttonText}
                </Button>
              </Card>
            ))}
            <Button
              type="button"
              onClick={() =>
                push({
                  name: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                })
              }
            >
              Add {buttonText}
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
}

ExperiencesDetails.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ).isRequired,
  Input: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ExperiencesDetails;
