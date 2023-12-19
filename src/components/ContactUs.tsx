import { useForm } from "react-hook-form";

type Props = {};

const ContactUs = (props: Props) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const submitForm = async (e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <div className="mx-auto w-5/6 mt-[40px] h-[560px] flex justify-center items-center">
      <div className="bg-white p-2 w-[700px] h-[450px] rounded-xl shadow-2xl flex justify-center items-center flex-col">
        <span className="text-4xl text-black font-bold">Contact Us</span>
        <text className="text-sm mt-1 text-blue-700">
          Have a question? Have an idea for a quiz? Let us know here!
        </text>
        <div className="mt-3 flex justify-center items-center">
          <form
            target="_blank"
            onSubmit={submitForm}
            action="https://formsubmit.co/ceba14498a6698ff674a54617cb8adb6"
            method="POST"
          >
            <input
              className="mb-3 w-full rounded-lg border
                 h-[35px] placeholder-blue-700"
              type="text"
              placeholder=" Name"
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && (
              <p className="mt-1 text-blue-700">
                {errors.name.type === "required" && "This field is required."}
                {errors.name.type === "maxLength" &&
                  "Max length is 100 characters."}
              </p>
            )}

            <input
              className="mb-3 w-full rounded-lg border
                h-[35px] placeholder-blue-700"
              type="text"
              placeholder=" Email"
              {...register("email", {
                required: true,
                maxLength: 100,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <p className="mt-1 text-blue-700">
                {errors.email.type === "required" && "This field is required."}
                {errors.email.type === "pattern" && "Invalid email address."}
                {errors.email.type === "maxLength" &&
                  "Max length is 100 characters."}
              </p>
            )}

            <textarea
              className="mb-5 w-full border rounded-lg
                h-[150px] placeholder-blue-700"
              placeholder=" Type message here"
              rows={4}
              cols={50}
              {...register("message", {
                required: true,
                maxLength: 2000,
              })}
            />
            {errors.message && (
              <p className="mt-1 text-blue-700">
                {errors.message.type === "required" &&
                  "This field is required."}
                {errors.message.type === "maxLength" &&
                  "Max length is 2000 char."}
              </p>
            )}

            <button
              type="submit"
              className="border bg-blue-500 h-[35px] text-blue-700 rounded-lg w-1/4 translate-x-[250px] hover:text-gray-700 hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
