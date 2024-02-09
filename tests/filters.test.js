import { describe } from "node:test";
import { filterComingFiveDays, filterOldScreenings } from "../utils/filters";

describe("filterOldScreenings", () => {
    it("should return an array with screenings that are in the future", () => {
        const date = new Date().getTime();

        const data = {
            data: [
                { id: 1, attributes: { start_time: date - 1000 } },
                { id: 2, attributes: { start_time: date + 1000 } },
                { id: 3, attributes: { start_time: date + 5000 } },
                { id: 4, attributes: { start_time: date - 5000 } },
            ],
        };

        const result = filterOldScreenings(data);

        expect(result).toHaveLength(2);

        expect(result).toEqual([
            { id: 2, attributes: { start_time: date + 1000 } },
            { id: 3, attributes: { start_time: date + 5000 } },
        ]);
    });
});

describe("filterComingFiveDays", () => {
    it("should return an array with a maximum of 10 screenings within the next 5 days (sorted by date)", () => {
        const date = new Date().getTime();
        const mSecPerDay = 24 * 60 * 60 * 1000;
        const data = {
            data: [
                { id: 1, attributes: { start_time: date + mSecPerDay * 6 } },
                { id: 2, attributes: { start_time: date + mSecPerDay * 2 } },
                { id: 3, attributes: { start_time: date + mSecPerDay * 3 } },
                { id: 4, attributes: { start_time: date + mSecPerDay * 4 } },
                { id: 5, attributes: { start_time: date + mSecPerDay * 4 } },
                { id: 6, attributes: { start_time: date + mSecPerDay * 4 } },
                { id: 7, attributes: { start_time: date + mSecPerDay * 4 } },
                { id: 8, attributes: { start_time: date + mSecPerDay * 4 } },
                { id: 9, attributes: { start_time: date + mSecPerDay * 4 } },
                { id: 10, attributes: { start_time: date + mSecPerDay * 3 } },
                { id: 11, attributes: { start_time: date + mSecPerDay * 1 } },
                { id: 12, attributes: { start_time: date + mSecPerDay * -1 } },
            ],
        };

        const result = filterComingFiveDays(data);

        expect(result).toHaveLength(10);

        expect(result).toEqual([
            { id: 11, attributes: { start_time: date + mSecPerDay * 1 } },
            { id: 2, attributes: { start_time: date + mSecPerDay * 2 } },
            { id: 3, attributes: { start_time: date + mSecPerDay * 3 } },
            { id: 10, attributes: { start_time: date + mSecPerDay * 3 } },
            { id: 4, attributes: { start_time: date + mSecPerDay * 4 } },
            { id: 5, attributes: { start_time: date + mSecPerDay * 4 } },
            { id: 6, attributes: { start_time: date + mSecPerDay * 4 } },
            { id: 7, attributes: { start_time: date + mSecPerDay * 4 } },
            { id: 8, attributes: { start_time: date + mSecPerDay * 4 } },
            { id: 9, attributes: { start_time: date + mSecPerDay * 4 } },
        ]);
    });
});
