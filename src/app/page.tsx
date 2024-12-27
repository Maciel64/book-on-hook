import DropFileInput from "@/components/drop-file-input";

export default function Home() {
  return (
    <div className="pl-52 pr-48 pt-48">
      <DropFileInput id="book-input" name="book-input" />
    </div>
  );
}
