// @ts-expect-error - This does not work because of the node resultion.
import styleguideConfig from "@popup-io/styleguide-config/eslint-config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export default [...styleguideConfig];
