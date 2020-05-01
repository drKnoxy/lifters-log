// @ts-check
import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";
import { defaultRecords, routine531 } from "./531-routine.js";
import * as utils from "./utils.js";
import { useStorageState } from "./composable.js";
import PRForm from "./pr-form.js";

const cx = utils.cx;

function App() {
  const [currentCycle, setCycle] = useStorageState("ngStorage-currentCycle", 0);
  const [currentWeek, setWeek] = useStorageState("ngStorage-currentWeek", 0);
  const [records, setRecords] = useStorageState("ngStorage-records", defaultRecords);
  const [isEditFormVis, setEditFormVis] = useState(false);

  return html`
    <div class="container mx-auto">
      <div class="px-2">
        <div>
          <h1 class="text-3xl mb-2">Online 5/3/1 Calculator</h1>
          <p class="text-sm mb-4">
            This is a calculator for wendler's 5/3/1 routine. Enter your PRs, and the tables below
            will update with what weights you should be using.
          </p>
        </div>

        <section>
          <div class="flex items-center">
            <h2 class="text-xl">Starting PRs</h2>
            ${!isEditFormVis &&
            html`<button
              type="button"
              class=${cx("ml-2", ...btn({ size: "small", pill: true }))}
              onClick=${() => setEditFormVis(true)}
            >
              Edit
            </button>`}
          </div>

          ${!isEditFormVis && html`<${PRList} records=${records} />`}
          ${isEditFormVis &&
          html`
            <${PRForm}
              records=${records}
              onClose=${() => setEditFormVis(false)}
              onSubmit=${(r) => {
                console.log("k");
                setRecords(r);
                setEditFormVis(false);
              }}
            />
          `}
        </section>

        <hr class="my-4" />

        <h2 class="text-xl mb-2">Lifting Routine</h2>

        <${CycleWeekControls}
          currentCycle=${currentCycle}
          currentWeek=${currentWeek}
          setWeek=${setWeek}
          setCycle=${setCycle}
        />
      </div>

      <table class="w-full mb-8 text-gray-700 border-t text-xs md:text-base">
        <thead>
          <tr class="bg-gray-200 border-b">
            <th colspan="99" class="py-1">
              Week ${currentWeek + 1} / Cycle ${currentCycle + 1}
            </th>
          </tr>
          <tr class="border-b">
            <th></th>
            ${records.map((r) => html`<th class="p-2">${r.label}</th>`)}
          </tr>
        </thead>
        <!-- Main Lifts -->
        <tbody>
          ${routine531(currentWeek).map((set, i, arr) => {
            const first = i === 0;
            const third = i === 3;
            const last = i === arr.length - 1;
            const workingSet = i === 5 || (third && arr.length === 4);
            return html`
              <tr class=${cx("border-b", { "border-gray-600": last })}>
                ${first && html`<th class="p-2 border-r" rowspan="3">Warm Up</th>`}
                ${third && html`<th class="p-2 border-r" rowspan="3">Active</th>`}
                ${records.map((record) => {
                  const css = cx("p-2 whitespace-no-wrap text-center", {
                    "bg-gray-200": workingSet,
                  });
                  const weight = utils.calcWeight(
                    utils.oneRepMax(record),
                    set.percentage,
                    currentCycle,
                    record.increment
                  );

                  return html`<td class=${css}>${set.reps} @ ${weight}</td>`;
                })}
              </tr>
            `;
          })}
        </tbody>
        <!-- Accessory -->
        <tbody>
          <tr class="border-b">
            <th class="p-2 border-r" rowspan="2">Accessory</th>
            ${records.map((record) => {
              return html`
                <td class="p-2 text-center">
                  ${getAccessoryText({ currentWeek, currentCycle, record })}
                </td>
              `;
            })}
          </tr>
          <tr class="border-b">
            <!-- th -->
            <td class="p-2">
              Chin-ups <span class="hidden sm:inline">-</span>
              <span class="whitespace-no-wrap"> 5 x 10</span>
            </td>
            <td class="p-2">
              Hanging Leg Raise <span class="hidden sm:inline">-</span>
              <span class="whitespace-no-wrap"> 5 x 10</span>
            </td>
            <td class="p-2">
              Dumbbell Row <span class="hidden sm:inline">-</span>
              <span class="whitespace-no-wrap"> 5 x 10</span>
            </td>
            <td class="p-2">
              Leg Curl <span class="hidden sm:inline">-</span>
              <span class="whitespace-no-wrap"> 5 x 10</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function BtnGroup({ count, activeIndex, onClick }) {
  return Array(count)
    .fill(undefined)
    .map((v, i, arr) => {
      const css = cx(...btn(), {
        "bg-gray-400 border-gray-500 shadow-inner": activeIndex == i,
        "rounded-l-none": i !== 0,
        "rounded-r-none": arr.length !== i + 1,
      });

      return html` <button type="button" class=${css} onClick=${() => onClick(i)}>
        ${i + 1}
      </button>`;
    });
}

function PRList({ records }) {
  return html`
    <div>
      ${records.map((record) => {
        return html`
          <div>
            <strong class="mr-2 text-gray-700">${record.label}:</strong>
            <span>${record.reps} @ ${record.weight}</span>
            ${record.reps > 1 && html`<i>(1RM x ${utils.round5(utils.oneRepMax(record))})</i>`}
          </div>
        `;
      })}
      <p class="text-sm text-gray-700">90% of your 1rm is used as the base for calculations</p>
    </div>
  `;
}

function btn({ size = "reg", pill = false } = { size: "reg" }) {
  return [
    "inline-flex",
    {
      small: "px-3 py",
      reg: "px-3 py-2",
    }[size],
    pill ? "rounded-full" : "rounded-sm",
    "text-sm font-bold uppercase",
    "border",
    "bg-gray-200 border-gray-300 text-gray-600",
    "hover:bg-gray-300 hover:border-gray-400",
  ];
}

function CycleWeekControls({ currentCycle, currentWeek, setCycle, setWeek }) {
  return html`
    <div class="flex flex-col-reverse md:flex-row md:justify-between">
      <div class="flex items-center justify-end mb-2">
        <label class="mr-2 text-gray-600">week:</label>
        <${BtnGroup} count=${4} activeIndex=${currentWeek} onClick=${(i) => setWeek(i)} />
      </div>
      <div class="flex items-center justify-end mb-2">
        <label class="mr-2 text-gray-600">cycle:</label>
        <${BtnGroup} count=${8} activeIndex=${currentCycle} onClick=${(i) => setCycle(i)} />
      </div>
    </div>
  `;
}
function getAccessoryText({ currentCycle, currentWeek, record }) {
  if (currentWeek === 3) return "-";
  const weight = utils.calcWeight(utils.oneRepMax(record), 0.6, currentCycle, record.increment);
  return `5 x 10 @  ${weight}`;
}

render(html`<${App} />`, document.getElementById("app"));
