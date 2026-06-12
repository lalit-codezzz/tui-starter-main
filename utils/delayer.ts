function delayer(value: string, delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

export default delayer;
