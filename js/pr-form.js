import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";
import { cx } from "./utils.js";

const PRForm = ({ records, onSubmit, onClose }) => {
  const [fields, setFields] = useState(records);
  const handleChange = (label, field) => (e) => {
    const v = e.target.value;
    const next = [];
    fields.forEach((f) => {
      if (f.label === label) {
        next.push({ ...f, [field]: v });
      } else {
        next.push(f);
      }
    });
    setFields(next);
  };

  return html`
    <form
      onSubmit=${(e) => {
        e.preventDefault();
        onSubmit(fields);
      }}
    >
      ${fields.map((record) => {
        return html`
          <div class="mb-4">
            <label class="font-bold mb-2 text-gray-700">${record.label}</label>
            <div class="flex mb-2 -mx-2">
              <div class="w-1/2 px-2">
                <div class="flex-col items-center">
                  <label class="text-gray-600 mr-2 w-1/5">Reps:</label>
                  <input
                    class="block w-full p-2 border rounded"
                    type="number"
                    onChange=${handleChange(record.label, "reps")}
                    value=${record.reps}
                    required
                  />
                </div>
              </div>
              <div class="w-1/2 px-2">
                <div class="flex-col items-center ">
                  <label class="text-gray-600 mr-2 w-1/5">Weight:</label>
                  <div class="flex-1 flex border rounded">
                    <input
                      class="block w-full p-2"
                      type="number"
                      onChange=${handleChange(record.label, "weight")}
                      value=${record.weight}
                      required
                    />
                    <div class="bg-gray-200 p-2 text-gray-600">
                      lbs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })}
      <button
        type="button"
        class=${cx(
          "mr-4",
          "px-4 py-2",
          "rounded-full",
          "uppercase text-sm font-bold shadow-lg",
          "border-2 border-white",
          "bg-gray-200 hover:bg-gray-300 text-gray-700"
        )}
        onClick=${onClose}
      >
        Cancel
      </button>
      <button
        type="submit"
        class=${cx(
          "px-4 py-2",
          "rounded-full",
          "uppercase text-sm font-bold shadow-lg",
          "border-2 border-blue-100",
          "bg-blue-400 text-blue-700 hover:bg-blue-300"
        )}
      >
        Save
      </button>
    </form>
  `;
};
export default PRForm;
