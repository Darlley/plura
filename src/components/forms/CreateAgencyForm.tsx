'use client';

import { Agency } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertDialog } from '../ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useToast } from '../ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Agency name must be atleast 2 chars' }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
});

type Props = {
  data: Partial<Agency>;
};
export default function CreateAgencyForm(props: Props) {
  const { data } = props;
  const { toast } = useToast();
  const router = useRouter();
  const [deletingAgency, setDeletingAgency] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data.name,
      companyEmail: data.companyEmail,
      companyPhone: data.companyPhone,
      whiteLabel: data.whiteLabel || false,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
      state: data.state,
      country: data.country,
      agencyLogo: data.agencyLogo,
    },
  });
  const isLoadingForm = form.formState.isSubmitting

  useEffect(() => {
    if (data) form.reset(data);
  }, [data]);

  function handleSubmit(values: z.infer<typeof FormSchema>) {}

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
          </CardDescription>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  disabled={isLoadingForm}
                  control={form.control}
                  name="agencyLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Logo</FormLabel>
                      <FormControl>FileUpload</FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </AlertDialog>
  );
}
