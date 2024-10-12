import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import PropTypes from "prop-types";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {useContext, useState} from "react";
import {ReviewContext} from "@/context/ReviewContext.jsx";
import {UserContext} from "@/context/UserContext.jsx";

Reviews.propTypes = {
    reviews: PropTypes.array,
    idCv: PropTypes.string.isRequired
}

function Reviews({ reviews, idCv }) {
    const { user } = useContext(UserContext);
    const { addReview } = useContext(ReviewContext);
    const [ errorMessage, setErrorMessage ] = useState("");
    const formik = useFormik({
        initialValues: {
            comment: "",
            rating: ""
        },
        validationSchema: Yup.object({
            comment: Yup.string().min(3, "Comment must be at least 3 characters").required("Comment is required"),
            rating: Yup.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").required("Rating is required")
        }),
        onSubmit: async (values) => {
            try {
                const review = await addReview(values, idCv);
                formik.resetForm();
                if (review) {
                    reviews.push(review);
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again later.");
                    throw new Error("Failed to add review");
                }
            } catch (error) {
                console.error("Add review error:", error);
            }
        }
    });
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
            {reviews?.length > 0 ? (
                reviews?.map((review, index) => (
                    <Card key={index} className="mb-4">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Recommendation {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{review?.comment}</p>
                            <div className="flex items-center mt-2">
                                <Badge variant="outline" className="mr-2">
                                    Rating: {review?.rating}/5
                                </Badge>
                                <p className="text-gray-500">Author: {review?.user?.firstname} {review?.user?.lastname}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p>No recommendations available.</p>
            )}
            {
                user && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Add Recommendation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                            <form onSubmit={formik.handleSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="comment">Comment</Label>
                                    <textarea
                                        id="comment"
                                        placeholder="Enter your comment here"
                                        {...formik.getFieldProps("comment")}
                                        className={formik.touched.comment && formik.errors.comment ? "border-red-500" : ""}
                                    />
                                    {formik.touched.comment && formik.errors.comment ? (
                                        <div className="text-red-500 text-sm">{formik.errors.comment}</div>
                                    ) : null}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        placeholder="Enter your rating here"
                                        {...formik.getFieldProps("rating")}
                                        className={formik.touched.rating && formik.errors.rating ? "border-red-500" : ""}
                                    />
                                    {formik.touched.rating && formik.errors.rating ? (
                                        <div className="text-red-500 text-sm">{formik.errors.rating}</div>
                                    ) : null}
                                </div>
                                <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                                    Add Recommendation
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}

export default Reviews;