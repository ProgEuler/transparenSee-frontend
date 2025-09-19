"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function InfoCard() {
  return (
    <Card className="w-full max-w-md rounded-lg shadow-sm border">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            Ref No <span className="font-normal text-gray-500">xxxxxx</span>
          </span>
          <span className="text-sm font-semibold">
            Type <span className="font-normal text-gray-500">X,Y,Z</span>
          </span>
        </div>
        <Badge variant="destructive" className="rounded-md">
          Live
        </Badge>
      </CardHeader>

      {/* Body */}
      <CardContent className="text-sm text-gray-700 space-y-2">
        <p>
          Invasion of X has caused $108.3 billion in damage to the countrys
          infrastructure, according to a study from Y School of Economics
          released the same day Xs defense ministry estimated the war has left
          3.5 million people homeless. It has damaged or destroyed 105,200 cars,
          43,700 agricultural machines, 764 kindergartens, 1,991 shops and 634
          cultural facilities, 434 healthcare facilities. $47.7 billion of
          damage to apartment buildings and private homes. $185 billion - Thats
          how much the infrastructure damages would cost to repair, researchers
          estimated.
        </p>
        <p>
          World wide private and organizations want to donate the money for
          humanitarian aid. But their money needs to channel through proper
          supplier, transporter and the whole supply chain flow. On one hand it
          needs to be verified aids are properly reached out to the refugee
          camps on its entire lifespan, on the other hand the type of aid and
          location need to kept private so that the invading country may not
          create disruption.
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-4 text-xs text-gray-500">
        dd/mm/yyyy - dd/mm/yyyy
      </CardFooter>
    </Card>
  );
}

// Example grid of cards
export default function CardGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      <InfoCard />
      <InfoCard />
      <InfoCard />
    </div>
  );
}
