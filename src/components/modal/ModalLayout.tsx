import { useModal } from "@/context/ModalContext";
import { ModalTypeProps } from "@/interfaces";
import { IconSm } from "../ui/icon/Icon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ButtonOne } from "../ui/button/ButtonOne";

export const ModalLayout = ({ id, title, children }: { id: ModalTypeProps; title: string; children: React.ReactNode }) => {
  const { modalActive, closeModal } = useModal();

  if (modalActive !== id) return null;

  return (
    <dialog onClick={closeModal} className="flex justify-center items-center w-full h-full bg-black/10">
      <section onClick={(e) => e.stopPropagation()} className="flex flex-col bg-secondary rounded-md w-[90%] h-2/4 sm:w-2/4 sm:h-2/4 p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-foregroundNav py-2">{title}</h2>
          <ButtonOne variant="nav" className="w-max px-2" onClick={closeModal}>
            <IconSm variant="nav" Icon={XMarkIcon} />
          </ButtonOne>
        </div>

        <div className="overflow-y-scroll">{children}</div>
      </section>
    </dialog>
  );
};
