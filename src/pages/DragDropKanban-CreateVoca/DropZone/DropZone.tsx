export function DropZone({ onDrop, onDragOver, onDragEnd, onDragLeave}: any) {
    return (
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragLeave={onDragLeave} // Pass onDragLeave event handler
        className="w-28 shrink-0 md:w-56 h-full min-h-screen z-50 bg-light-200"
      ></div>
    );
  }
  