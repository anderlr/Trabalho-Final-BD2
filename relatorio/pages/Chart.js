import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
const data = [{ match: 1, kills: 20 }, { match: 2, kills: 7 }, { match: 3, kills: 12 }, { match: 4, kills: 15 }];

import * as React from 'react';
export default function Chart() {
    return (
        <ResponsiveContainer width="95%" height={400}>
            <LineChart data={data} margin="{ top: 5, right: 5, bottom: 5, left: 5 }">
                <Line type="monotone" dataKey="kills" stroke="#000" />
                <CartesianGrid stroke="#000" />
                <YAxis dataKey="kills" />
                <XAxis dataKey="match" label="match" />
                <Tooltip />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    );
}