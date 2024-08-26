import { cn } from "@/lib/utils";
import { Stepper } from "@stepperize/react";

export function Step({
  stepId,
  step,
  stepper,
  isLast = false,
}: {
  stepId: string;
  step: number;
  stepper: Stepper<
    [
      {
        readonly id: "1";
        readonly title: "Create Shipment";
      },
      {
        readonly id: "2";
        readonly title: "Second";
      },
      {
        readonly id: "3";
        readonly title: "Checkout";
      }
    ]
  >;
  isLast?: boolean;
}) {
  const isActive = stepper.current.id === stepId;

  const currentStepId = parseInt(stepper.current.id, 10);
  const isDone = step < currentStepId;

  return (
    <li
      className={cn(
        "flex w-full relative text-amber-600",
        !isLast &&
          "after:content-[''] after:w-full after:h-0.5 after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-4 after:left-4",
        isDone && "after:bg-indigo-600"
      )}
    >
      <div className="block whitespace-nowrap z-10">
        <span
          className={cn(
            "size-8 bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:size-10",
            !isDone && "bg-gray-50 border-gray-200 text-gray-900",
            isActive && "bg-indigo-50 text-indigo-600 border-indigo-600"
          )}
        >
          {step}
        </span>
      </div>
    </li>
  );
}

// <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5  after:top-3 after:left-4">
//          <div className="block whitespace-nowrap z-10">
//              <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-10 lg:h-10">3</span> Step 3
//          </div>
//       </li>
