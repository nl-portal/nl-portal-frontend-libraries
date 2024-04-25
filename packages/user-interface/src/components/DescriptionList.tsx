import { DescriptionList as DescriptionListComponent } from "@gemeente-denhaag/descriptionlist";
import SectionHeader from "./SectionHeader";

interface Props {
  title?: string;
  items: {
    title: React.ReactNode;
    detail: React.ReactNode;
  }[];
}

const DescriptionList = ({ title, items }: Props) => {
  return (
    <section>
      <SectionHeader title={title} />
      <DescriptionListComponent items={items} />
    </section>
  );
};

export default DescriptionList;
