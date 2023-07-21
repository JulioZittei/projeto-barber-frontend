"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

type Props = {
  startAtSeconds: number;
  onResend?: () => Promise<void>;
};

export function ResendTimedButton({ startAtSeconds, onResend }: Props) {
  const [timer, setTimer] = useState(startAtSeconds);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleResendClick = async () => {
    setTimer(startAtSeconds);
    if (onResend) {
      await onResend();
    }
  };

  return (
    <>
      {timer > 0 ? (
        <Button
          variant="link"
          className="p-0"
          disabled
        >{`Aguarde ${timer}s`}</Button>
      ) : (
        <Button variant="link" className="p-0" onClick={handleResendClick}>
          Reenviar
        </Button>
      )}
    </>
  );
}

export default ResendTimedButton;
