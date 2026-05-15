import { AnalogClock } from "@/components/Clock/clock";
import { PageContentLayout } from "@/shared/layouts/page-content-layout/page-content-layout";
import { MenuButton } from "@/shared/ui/menu-button/menu-button";

export function ClockPage() {
  return (<AnalogClock />
    // <PageContentLayout
    //   mainContent={<AnalogClock />}
    //   // mainContentScroll
    //   footerContent={<MenuButton text="Click Me" onClick={() => {}} />}
    // />
  );
}
