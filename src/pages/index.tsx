// pages/index.tsx
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Progress } from "@/components/ui/progress";

const mockSites = [
    {
        id: 1,
        locationName: "Downtown Office Complex",
        address: "123 Business St, New York, NY 10001",
        occupationRate: 85,
    },
    {
        id: 2,
        locationName: "Tech Hub Campus",
        address: "456 Innovation Ave, San Francisco, CA 94105",
        occupationRate: 92,
    },
    // …additional sites
];

export default function Home() {
    const router = useRouter();
    const handleLocationClick = (name: string) =>
        router.push(`/locale/${encodeURIComponent(name)}`);

    return (
        <PageLayout title="Sites">
            <div className="bg-card rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4 px-6 font-semibold">Location Name</th>
                                <th className="text-left py-4 px-6 font-semibold">Address</th>
                                <th className="text-left py-4 px-6 font-semibold">
                                    Occupation Rate
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSites.map((site) => (
                                <tr
                                    key={site.id}
                                    className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                                    onClick={() => handleLocationClick(site.locationName)}
                                >
                                    <td className="py-4 px-6 font-medium">{site.locationName}</td>
                                    <td className="py-4 px-6 text-muted-foreground">
                                        {site.address}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <Progress
                                                value={site.occupationRate}
                                                className="flex-1 max-w-[200px]"
                                            />
                                            <span className="text-sm font-medium min-w-[3rem]">
                                                {site.occupationRate}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageLayout>
    );
}
